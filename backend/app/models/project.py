from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import Literal
from typing import Annotated
from pydantic import AfterValidator, BaseModel

NEEDLE_SIZES = ["2.00", "2.25", "2.50", "2.75", "3.00", "3.25", "3.75", "4.00", "4.50", "5.00", "5.50", "6.00", "8.00", "10.00"]

def is_needle_size(value: float) -> float:
    if value not in NEEDLE_SIZES:
        raise ValueError(f'{value} is not an accepted needle size')
    return value  

def is_positive_integer(value: int) -> int:
    if value <= 0:
        raise ValueError(f'{value} is not a valid integer')
    return value  

class Gauge(BaseModel):
    needle: Annotated[str, AfterValidator(is_needle_size)]
    stitches: Optional[Annotated[int, AfterValidator(is_positive_integer)]] = None
    rows: Optional[Annotated[int, AfterValidator(is_positive_integer)]] = None

class Project(BaseModel):
    _id: Optional[str]
    title: str
    designer: str
    gauge: Gauge
    status: Literal["created", "inProgress", "finished"] = "created"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
