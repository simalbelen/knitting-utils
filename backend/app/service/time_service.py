
from fastapi import HTTPException
from app.repository.crud_repository import CrudRepository
from datetime import datetime
from pymongo import DESCENDING

class TimeService:
    def __init__(self):
        self.repository = CrudRepository("time")

    def find_last_clock_in(self, id_project:str, db):
        query = {"project": id_project}
        projection = {"start": 1, "end": 1}
        sort=[("start", DESCENDING)]
        time = self.repository.find_one(query=query, projection=projection, sort=sort, db=db)
        if time is None:
            raise HTTPException(status_code=404, detail="Not Found")
        return time

    def clock_in(self, id_project:str, db):
        closed_clock_in = True
        try:
            last_clock_in = self.find_last_clock_in(id_project, db)
            if not last_clock_in.get("end"):
                closed_clock_in = False
        except HTTPException:
            pass

        if not closed_clock_in:
            raise HTTPException(status_code=409, detail="You need to clock out first")
        
        now = datetime.now()
        time = {"project": id_project, "start": now}
        return self.repository.add_one(obj = time, db=db)
    
    def clock_out(self, id_project:str, db):
        last_clock_in = self.find_last_clock_in(id_project, db)
        if last_clock_in.get("end"):
            raise HTTPException(status_code=409, detail="You need to clock in first")
        
        now = datetime.now()
        query = {"_id": last_clock_in.get("_id")}
        update = {
            "$set": {
                "end": now,
                "diff_seconds":  int((now - last_clock_in.get("start")).total_seconds())
            }
        }
        return self.repository.update(query=query, update=update, upsert=False, db=db)
    
    def get_total_time_by_project(self, id_project:str, db):
        query = {"project": id_project}
        field = "diff_seconds"
        return self.repository.aggregate(query=query, field=field, db=db)
