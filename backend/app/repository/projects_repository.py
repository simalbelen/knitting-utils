from app.repository.utils_repository import convert_ids_to_objectid, convert_ids_to_str
from loguru import logger
from fastapi import HTTPException

class ProjectsRepository:
    def __init__(self):
        self.collection = "projects"

    def find_many(self, query = None, projection = None, db=None, timezone="Europe/Madrid"):            
        try:
            query = convert_ids_to_objectid(query)
            data =  list(db[self.collection].find(query , projection))
            data = convert_ids_to_str(data)

            return data
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def find_one(self, query = None, projection = None, db=None, timezone="Europe/Madrid"):            
        try:
            query = convert_ids_to_objectid(query)
            data =  db[self.collection].find_one(query , projection)
            data = convert_ids_to_str(data)
            return data
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def add_one(self, project, db=None):            
        try:
            result = db[self.collection].insert_one(project)
            project['_id'] = str(result.inserted_id)
            return project  
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def update(self, query=None , update=None, db=None, upsert=False):
        try:
            query = convert_ids_to_objectid(query)
            result =  db[self.collection].update_one(query , update, upsert=upsert)
            return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count}
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
    