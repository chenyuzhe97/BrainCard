from pydantic import BaseModel


class PlayerModel(BaseModel):
    chip_id: int
    random_seed: float
    game_category: int
