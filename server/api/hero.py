from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class HeroSelect(BaseModel):
    hero_id: int
    user_id: int

@router.post("/hero_select")
def hero_select(hero: HeroSelect):
    print(hero)
    return hero 