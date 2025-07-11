from fastapi import HTTPException
from app.repository.projects_repository import ProjectsRepository
from datetime import datetime

class ProjectsService:
    def __init__(self):
        self.repository = ProjectsRepository()

    def add_project(self, project, db):    
        project["created_at"] = datetime.now()
        project["updated_at"] = datetime.now()   
        return self.repository.add_one(project = project.model_dump(), db=db)

    def find_project(self, id, db):
        query = {"_id": id}
        project = self.repository.find_one(query=query, db=db)
        if project is None:
            raise HTTPException(status_code=404, detail="Not Found")
        return project
    
    def find_projects(self, db):
        query = {}
        projection = {"name":1, "updated_at":1 }
        return self.repository.find_many(query=query, projection=projection, db=db)
    
    def update_project_current_row(self, id, row, db):
        query = {"_id": id}
        update = {
            "$set": {
                "current_row": row,
                "updated_at": datetime.now()
            }
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)
