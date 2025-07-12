from fastapi import HTTPException
from datetime import datetime
from app.repository.crud_repository import CrudRepository

class ProjectsService:
    def __init__(self):
        self.repository = CrudRepository("projects")

    def add_project(self, project, db): 
        now = datetime.now()
        project.created_at = now
        project.updated_at = now  
        return self.repository.add_one(obj = project.model_dump(), db=db)

    def find_project(self, id, db):
        query = {"_id": id}
        project = self.repository.find_one(query=query, db=db)
        if project is None:
            raise HTTPException(status_code=404, detail="Not Found")
        return project
    
    def find_projects(self, db):
        query = {}
        projection = {"title":1, "designer":1, "status": 1}
        return self.repository.find_many(query=query, projection=projection, db=db)
    