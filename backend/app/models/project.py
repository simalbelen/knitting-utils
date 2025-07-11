from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Project(BaseModel):
    _id: Optional[str]
    name: str
    current_row: int = 0
    goal_row: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

