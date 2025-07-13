
from fastapi import HTTPException
from app.models.section import Section
from app.repository.crud_repository import CrudRepository
from datetime import datetime

class SectionsService:
    def __init__(self):
        self.repository = CrudRepository("sections")

    def find_section(self, id:str, db):
        query = {"_id": id}
        projection = {"project": 0, "created_at": 0, "updated_at": 0}
        section = self.repository.find_one(query=query, projection=projection, db=db)
        if section is None:
            raise HTTPException(status_code=404, detail="Not found")
        return section

    def add_section(self, section:Section, db): 
        now = datetime.now()
        section.created_at = now
        section.updated_at = now  
        return self.repository.add_one(obj = section.model_dump(), db=db)
    
    def delete_section(self, id:str, db):
        self.find_section(id, db)
        query = {"_id": id}
        self.repository.delete_one(query=query, db=db)
    
    def find_sections_by_project(self, id_project, db):
        query = {"project": id_project}
        projection = {"title":1, "current_row":1, "goal_row":1, "status": 1, "project": 1}
        return self.repository.find_many(query=query, projection=projection, db=db)
    
    def update_section(self, id:str, section:Section, db):
        db_section = self.find_section(id, db)
        query = {"_id": id}
        updated_section = {
            "updated_at": datetime.now()
        }
        if db_section.get("title") != section.title:
            updated_section["title"] = section.title
        if db_section.get("notes") != section.notes:
            updated_section["notes"] = section.notes
        if db_section.get("goal_row") != section.goal_row:
            updated_section["goal_row"] = section.goal_row
        if db_section.get("knit_mode") != section.knit_mode:
            updated_section["knit_mode"] = section.knit_mode.model_dump()
        if db_section.get("accent_stitches") != section.accent_stitches:
            dict_accent_stitches = [a.model_dump() for a in section.accent_stitches]
            updated_section["accent_stitches"] = dict_accent_stitches
        update = {
            "$set": updated_section
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)

    def duplicate_section(self, id:str, db):
        db_section = self.find_section(id, db)
        del(db_section["_id"])
        db_section["title"] = f"{db_section.get('title')} copy"
        db_section["current_row"] = 0
        self.add_section(db_section, db)

    def update_section_current_row(self, id, row, db):
        self.find_section(id, db)
        query = {"_id": id}
        update = {
            "$set": {
                "current_row": row,
                "updated_at": datetime.now()
            }
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)
