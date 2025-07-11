from app.api.routes import projects
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(projects.router, tags=["projects"], prefix="/projects")
