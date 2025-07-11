from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Project(BaseModel):
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

