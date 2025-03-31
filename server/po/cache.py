from server.model.Game import CurrentSceneModel


class GameCache(dict[str, CurrentSceneModel]):
    def __init__(self):
        super().__init__()

    def __getitem__(self, key: str) -> CurrentSceneModel:
        return super().__getitem__(key)

game_cache = GameCache()

