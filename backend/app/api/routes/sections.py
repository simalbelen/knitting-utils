from fastapi import APIRouter, Request
from app.service.sections_service import SectionsService
from app.models.section import Section

router = APIRouter()
section_service = SectionsService()

@router.post("/")
async def addSection(request: Request, section:Section):
    return section_service.add_section(section=section, db=request.app.state.db)

@router.delete("/{id}")
async def deleteSection(request: Request, id:str):
    return section_service.delete_section(id=id, db=request.app.state.db)

@router.get("/{id}")
async def findSection(request: Request, id:str):
    return section_service.find_section(id=id, db=request.app.state.db)

@router.get("/project/{id_project}")
async def findSectionsByProject(request: Request, id_project:str):
    return section_service.find_sections_by_project(id_project=id_project, db=request.app.state.db)

@router.patch("/{id}/row")
async def updateSectionCurrentRow(request: Request, id:str, row:int):
    return section_service.update_section_current_row(id=id, row=row, db=request.app.state.db)

@router.put("/{id}")
async def updateSection(request: Request, id:str, section:Section):
    return section_service.update_section(id=id, section=section, db=request.app.state.db)

@router.post("/{id}/duplicate")
async def duplicateSection(request: Request, id:str):
    return section_service.duplicate_section(id, db=request.app.state.db)
