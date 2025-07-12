from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class Section(BaseModel):
    _id: Optional[str]
    project: str
    title: str
    current_row: int = 0
    goal_row: int
    status: Literal["created", "inProgress", "finished"] = "created"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
