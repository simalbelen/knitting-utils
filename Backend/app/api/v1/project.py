from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId

from app.models.project_model import ProjectModel, CreateProjectModel
from app.services import project_service

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=ProjectModel)
async def create(project: CreateProjectModel):
    created = await project_service.create_project(project.dict())
    return created

@router.get("/", response_model=List[ProjectModel])
async def list_projects():
    return await project_service.list_projects()

@router.get("/{project_id}", response_model=ProjectModel)
async def get(project_id: str):
    project = await project_service.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    return project

@router.put("/{project_id}", response_model=ProjectModel)
async def update(project_id: str, project: CreateProjectModel):
    result = await project_service.update_project(project_id, project.dict())
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    updated = await project_service.get_project(project_id)
    return updated

@router.delete("/{project_id}")
async def delete(project_id: str):
    result = await project_service.delete_project(project_id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"message": "Deleted"}
