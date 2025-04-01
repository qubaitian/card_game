from events import Events
from functools import wraps

# 创建一个全局事件管理器
card_events = Events()

def emit_pick_event(f):
    """装饰器：用于发出卡牌被选择的事件"""
    @wraps(f)
    def wrapper(self, *args, **kwargs):
        result = f(self, *args, **kwargs)
        # 发出事件，传递卡牌实例和参数
        card_events.on_card_picked(self, *args, **kwargs)
        return result
    return wrapper

class Card:
    def __init__(self):
        self.subscribers = []  # Track event subscriptions

    def cleanup(self):
        """清理卡牌的事件订阅"""
        for subscriber in self.subscribers:
            card_events.on_card_picked -= subscriber

    @emit_pick_event
    def when_pick(self, *args, **kwargs):
        """卡牌被选择时的基础实现"""
        print('when pick')
        pass

class PVP_1003(Card):
    def __init__(self):
        super().__init__()
        # 注册事件监听器并追踪它
        card_events.on_card_picked += self.on_other_card_picked
        self.subscribers.append(self.on_other_card_picked)
    
    def on_other_card_picked(self, card: Card, *args, **kwargs):
        """
        监听其他卡牌被选择时的事件
        Args:
            card: 被选择的卡牌
        """
        if card is not self:  # 避免自身触发
            print(f"Card {type(card).__name__} was pick")
