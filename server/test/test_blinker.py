import pytest
from blinker import signal
from functools import wraps

# 定义信号
card_picked = signal('card-picked')
card_played = signal('card-played')

# 装饰器：用于发出卡牌事件
def emit_card_event(signal_name):
    def decorator(f):
        @wraps(f)
        def wrapper(self, *args, **kwargs):
            result = f(self, *args, **kwargs)
            # 获取对应的信号
            event_signal = signal(signal_name)
            # 发送信号
            event_signal.send(self, card=self, args=args, kwargs=kwargs)
            return result
        return wrapper
    return decorator

# 模拟卡牌类
class Card:
    def __init__(self, card_id):
        self.card_id = card_id
        self.pick_count = 0
        self.play_count = 0

    @emit_card_event('card-picked')
    def when_pick(self, player=None):
        self.pick_count += 1
        return f"Card {self.card_id} picked"

    @emit_card_event('card-played')
    def when_play(self, player=None):
        self.play_count += 1
        return f"Card {self.card_id} played"

# 模拟监听卡牌
class ListenerCard(Card):
    def __init__(self, card_id):
        super().__init__(card_id)
        self.picked_cards = []
        self.played_cards = []
        # 注册信号监听器
        card_picked.connect(self.on_other_card_picked)
        card_played.connect(self.on_other_card_played)

    def on_other_card_picked(self, sender, **event_args):
        if sender is not self:  # 避免自身触发
            card = event_args.get('card')
            self.picked_cards.append(card.card_id)

    def on_other_card_played(self, sender, **event_args):
        if sender is not self:  # 避免自身触发
            card = event_args.get('card')
            self.played_cards.append(card.card_id)

# 测试夹具
@pytest.fixture
def cards():
    return [Card(i) for i in range(1, 4)]

@pytest.fixture
def listener_card():
    return ListenerCard(999)

# 测试用例
class TestCardEvents:
    def test_basic_card_events(self, cards):
        """测试基本的卡牌事件发送"""
        card = cards[0]
        assert card.pick_count == 0
        card.when_pick()
        assert card.pick_count == 1

    def test_listener_card_pick_events(self, cards, listener_card):
        """测试监听卡牌能否正确接收其他卡牌的pick事件"""
        # 其他卡牌被pick
        for card in cards:
            card.when_pick()
        
        # 验证监听卡牌是否收到了所有事件
        assert len(listener_card.picked_cards) == len(cards)
        assert all(card_id in listener_card.picked_cards for card_id in range(1, 4))

    def test_listener_card_play_events(self, cards, listener_card):
        """测试监听卡牌能否正确接收其他卡牌的play事件"""
        # 其他卡牌被play
        for card in cards:
            card.when_play()
        
        # 验证监听卡牌是否收到了所有事件
        assert len(listener_card.played_cards) == len(cards)
        assert all(card_id in listener_card.played_cards for card_id in range(1, 4))

    def test_listener_self_events(self, listener_card):
        """测试监听卡牌不会接收到自己的事件"""
        listener_card.when_pick()
        listener_card.when_play()
        
        assert len(listener_card.picked_cards) == 0
        assert len(listener_card.played_cards) == 0

    @pytest.mark.parametrize("event_count", [1, 5, 10])
    def test_multiple_events(self, cards, listener_card, event_count):
        """测试多次事件触发"""
        card = cards[0]
        for _ in range(event_count):
            card.when_pick()
            card.when_play()
        
        assert len(listener_card.picked_cards) == event_count
        assert len(listener_card.played_cards) == event_count

    def test_temporary_listener(self, cards):
        """测试临时监听器"""
        temp_events = []
        
        def temp_handler(sender, **event_args):
            temp_events.append(event_args.get('card').card_id)

        # 使用上下文管理器临时连接信号
        with card_picked.connected_to(temp_handler):
            cards[0].when_pick()
            assert len(temp_events) == 1
        
        # 信号断开后不应该再收到事件
        cards[1].when_pick()
        assert len(temp_events) == 1
