from fastapi import APIRouter, Request
from app.service.projects_service import ProjectsService


router = APIRouter()
app = ProjectsService()

@router.get("/")
async def findProjects(request: Request): #, authenticated: bool = Depends(security.ensure_employee_authenticated)):
    return {"hello":"world"}