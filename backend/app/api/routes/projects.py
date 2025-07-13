from fastapi import APIRouter, Request
from app.service.projects_service import ProjectsService
from app.models.project import Project


router = APIRouter()
projects_service = ProjectsService()

@router.get("/")
async def findProjects(request: Request):
    return projects_service.find_projects(db=request.app.state.db)

@router.get("/{id}")
async def findProject(request: Request, id:str):
    return projects_service.find_project(id, db=request.app.state.db)

@router.post("/")
async def addProject(request: Request, project:Project):
    return projects_service.add_project(project=project, db=request.app.state.db)

@router.put("/{id}")
async def updateProject(request: Request, id:str, project:Project):
    return projects_service.update_project(id=id, project=project, db=request.app.state.db)

