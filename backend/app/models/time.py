from typing import Optional
from datetime import datetime
from typing import Annotated
from pydantic import AfterValidator, BaseModel
from bson import ObjectId
from bson.errors import InvalidId

def is_valid_objectid(value: str) -> str:
    try:
        aux = ObjectId(value)
    except InvalidId:
        raise ValueError(f'{value} is not a valid ObjectId')
    return value

class Time(BaseModel):
    _id: Optional[str]
    project: Annotated[str, AfterValidator(is_valid_objectid)]
    start: datetime
    end: Optional[datetime] = None
    diff_seconds: Optional[int] = None