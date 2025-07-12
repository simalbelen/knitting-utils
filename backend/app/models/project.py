from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import Literal
from typing import Annotated
from pydantic import AfterValidator, BaseModel

NEEDLE_SIZES = [2.0, 2.25, 2.5, 2.75, 3, 3.25, 3.75, 4, 4.5, 5, 5.5, 6, 8, 10]

def is_needle_size(value: float) -> float:
    if value not in NEEDLE_SIZES:
        raise ValueError(f'{value} is not an accepted needle size')
    return value  

def is_positive_integer(value: int) -> int:
    if value <= 0:
        raise ValueError(f'{value} is not a valid integer')
    return value  

class Gauge(BaseModel):
    needle: Annotated[float, AfterValidator(is_needle_size)]
    stitches: Annotated[int, AfterValidator(is_positive_integer)]
    rows: Annotated[int, AfterValidator(is_positive_integer)]

class Project(BaseModel):
    _id: Optional[str]
    title: str
    designer: str
    gauge: Optional[Gauge] = None
    status: Literal["created", "inProgress", "finished"] = "created"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
