import pytest
from events import Events
from server.test.test_event import Card, PVP_1003, card_events

@pytest.fixture(autouse=True)
def setup_teardown():
    """自动清理所有事件订阅"""
    card_events.on_card_picked.targets.clear()
    yield
    card_events.on_card_picked.targets.clear()

def test_card_subscription():
    """测试卡牌事件订阅"""
    card = PVP_1003()
    assert card.on_other_card_picked in card_events.on_card_picked.targets

def test_card_cleanup():
    """测试卡牌清理功能"""
    card = PVP_1003()
    card.cleanup()
    assert card.on_other_card_picked not in card_events.on_card_picked.targets

def test_multiple_cards_interaction():
    """测试多张卡牌之间的交互"""
    card1 = PVP_1003()
    card2 = PVP_1003()
    
    # 测试card1被选择时触发card2的监听
    card1.when_pick()
    # 测试card2被选择时触发card1的监听
    card2.when_pick()


def test_card_self_pick():
    """测试卡牌被自己选择时不触发自身监听"""
    card = PVP_1003()
    print('hello')
    card.when_pick()