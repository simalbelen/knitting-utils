from fastapi import APIRouter, Request
from app.service.projects_service import ProjectsService
from app.models.project import Project


router = APIRouter()
app = ProjectsService()

@router.get("/")
async def findProjects(request: Request): #, authenticated: bool = Depends(security.ensure_employee_authenticated)):
    return [
        {"_id":1, "name": "mi nombre", "currentRow": 5, "goalRow": 44}
    ]

@router.get("/{id}")
async def findProject(request: Request, id:int): #, authenticated: bool = Depends(security.ensure_employee_authenticated)):
    return {"_id":1, "name": "mi nombre", "currentRow": 5, "goalRow": 44}
