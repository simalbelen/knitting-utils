from fastapi import HTTPException
from datetime import datetime
from app.repository.crud_repository import CrudRepository
from app.models.project import Project

class ProjectsService:
    def __init__(self):
        self.repository = CrudRepository("projects")

    def add_project(self, project:Project, db): 
        now = datetime.now()
        project.created_at = now
        project.updated_at = now  
        if project.gauge:
            project.gauge = project.gauge.model_dump()
        return self.repository.add_one(obj = project.model_dump(), db=db)
    
    def update_project(self, id:str, project:Project, db): 
        db_project = self.find_project(id, db)
        query = {"_id": id}
        updated_project = {
            "updated_at": datetime.now()
        }
        if db_project.get("title") != project.title:
            updated_project["title"] = project.title
        if db_project.get("designer") != project.designer:
            updated_project["designer"] = project.designer
        if db_project.get("gauge") != project.gauge:
            updated_project["gauge"] = project.gauge.model_dump()

        update = {
            "$set": updated_project
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)

    def find_project(self, id, db):
        query = {"_id": id}
        projection = {"title":1, "designer":1, "gauge": 1}
        project = self.repository.find_one(query=query, projection=projection, db=db)
        print(project)
        if project is None:
            raise HTTPException(status_code=404, detail="Not Found")
        return project
    
    def find_projects(self, db):
        query = {}
        projection = {"title":1, "designer":1, "status": 1, "gauge": 1, "created_at": 1}
        projects =  self.repository.find_many(query=query, projection=projection, db=db)
        return sorted(projects, key=lambda p: p['created_at'], reverse=True)
    