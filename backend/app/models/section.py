from typing import List, Optional
from datetime import datetime
from typing import Literal
from typing import Annotated
from pydantic import AfterValidator, BaseModel
from bson import ObjectId
from bson.errors import InvalidId

def is_positive_integer(value: int) -> int:
    if value <= 0:
        raise ValueError(f'{value} is not a valid integer')
    return value

def is_valid_objectid(value: str) -> str:
    try:
        aux = ObjectId(value)
    except InvalidId:
        raise ValueError(f'{value} is not a valid ObjectId')
    return value

class KnitMode(BaseModel):
    knit_flat: bool
    knit_right_side: bool

#[empezar desde 0, num] pares, impares, cada x, libre
class AccentStitch(BaseModel):
    start_row: int = 0
    each_type: Literal["even", "odd", "fixed", "free"]
    each_n_row: Optional[int] = None
    symbol: str
    description: str
    stitches: List[int]

class Section(BaseModel):
    _id: Optional[str]
    project: Annotated[str, AfterValidator(is_valid_objectid)]
    title: str
    notes: Optional[str] = None
    current_row: Optional[Annotated[int, AfterValidator(is_positive_integer)]] = 0
    goal_row: Annotated[int, AfterValidator(is_positive_integer)]
    knit_mode: KnitMode
    accent_stitches: Optional[List[AccentStitch]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
