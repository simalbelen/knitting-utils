from app.api.routes import projects, sections
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(projects.router, tags=["projects"], prefix="/projects")
api_router.include_router(sections.router, tags=["sections"], prefix="/sections")
