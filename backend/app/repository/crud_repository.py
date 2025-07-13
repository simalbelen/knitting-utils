from app.repository.utils_repository import convert_ids_to_objectid, convert_ids_to_str
from loguru import logger
from fastapi import HTTPException

class CrudRepository:
    def __init__(self, collection_name):
        self.collection = collection_name

    def find_many(self, query = None, projection = None, sort = None, db = None):            
        try:
            query = convert_ids_to_objectid(query)
            if sort:
                data = list(db[self.collection].find(query, projection, sort))
            else:
                data = list(db[self.collection].find(query, projection))
            data = convert_ids_to_str(data)
            return data
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def find_one(self, query = None, projection = None, sort = None, db = None):            
        try:
            query = convert_ids_to_objectid(query)
            if sort:
                print(query)
                print(sort)
                data = db[self.collection].find_one(query, projection, sort=sort)
            else:
                data = db[self.collection].find_one(query, projection)
            data = convert_ids_to_str(data)
            return data
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def add_one(self, obj, db=None):            
        try:
            result = db[self.collection].insert_one(obj)
            obj['_id'] = str(result.inserted_id)
            return obj  
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def delete_one(self, query=None, db=None):            
        try:
            query = convert_ids_to_objectid(query)
            db[self.collection].delete_one(query)
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    def update(self, query=None , update=None, db=None, upsert=False):
        try:
            query = convert_ids_to_objectid(query)
            result = db[self.collection].update_one(query , update, upsert=upsert)
            return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count}
        except Exception as e:
            logger.error(e)
            raise HTTPException(status_code=500, detail=str(e))
    
    def aggregate(self, query=None, field=str, db=None):
        pipeline = [
                {
                    "$match": query  # Filtrar por estado
                },
                {
                    "$group": {
                        "_id": None,
                        "total": {"$sum": f"${field}"}  # Sumar campo monto
                    }
                }
            ]
        print(pipeline)
        result = list(db[self.collection].aggregate(pipeline))
        print(result)
        return result[0]["total"] if result else 0