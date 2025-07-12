from fastapi import APIRouter, Request
from app.service.sections_service import SectionsService
from app.models.section import Section

router = APIRouter()
section_service = SectionsService()

@router.post("/")
async def addSection(request: Request, section:Section):
    return section_service.add_section(section=section, db=request.app.state.db)

@router.get("/{id_project}")
async def findProjectSections(request: Request, id_project:str):
    return section_service.find_project_sections(id_project=id_project, db=request.app.state.db)