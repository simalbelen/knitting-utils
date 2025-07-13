from fastapi import APIRouter, Request
from app.service.time_service import TimeService


router = APIRouter()
time_service = TimeService()

@router.post("/{id_project}")
async def clockInProject(request: Request, id_project: str):
    return time_service.clock_in(id_project=id_project, db=request.app.state.db)

@router.put("/{id_project}")
async def clockOutProject(request: Request, id_project: str):
    return time_service.clock_out(id_project=id_project, db=request.app.state.db)

@router.get("/{id_project}/total")
async def getTimeByProject(request: Request, id_project: str):
    return time_service.get_total_time_by_project(id_project=id_project, db=request.app.state.db)

@router.get("/{id_project}")
async def getLastClockIn(request: Request, id_project: str):
    return time_service.find_last_clock_in(id_project=id_project, db=request.app.state.db)