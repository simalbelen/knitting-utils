
from fastapi import HTTPException
from app.models.section import Section
from app.repository.crud_repository import CrudRepository
from datetime import datetime

class SectionsService:
    def __init__(self):
        self.repository = CrudRepository("sections")

    def add_section(self, section:Section, db): 
        now = datetime.now()
        section.created_at = now
        section.updated_at = now  
        return self.repository.add_one(obj = section.model_dump(), db=db)
    
    def find_project_sections(self, id_project, db):
        query = {"project": id_project}
        projection = {"title":1, "current_row":1, "goal_row":1, "status": 1}
        return self.repository.find_many(query=query, projection=projection, db=db)
    
    def update_section_current_row(self, id, row, db):
        query = {"_id": id}
        update = {
            "$set": {
                "current_row": row,
                "updated_at": datetime.now()
            }
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)
