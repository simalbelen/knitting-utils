from app.db.mongo import db
from bson import ObjectId

collection = db.projects

async def create_project(data: dict):
    result = await collection.insert_one(data)
    return await collection.find_one({"_id": result.inserted_id})

async def list_projects():
    return await collection.find().to_list(1000)

async def get_project(project_id):
    
    return await collection.find_one({"_id": ObjectId(project_id)})

async def update_project(project_id, data: dict):
    result = await collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": data}
    )
    return result

async def delete_project(project_id):
    result = await collection.delete_one({"_id": ObjectId(project_id)})
    return result
