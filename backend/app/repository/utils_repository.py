from bson.objectid import ObjectId

def convert_ids_to_objectid(query):
    for key, value in query.items():
        if isinstance(value, dict):
            convert_ids_to_objectid(value)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    convert_ids_to_objectid(item)
        if key == "_id" and isinstance(value, str):
            query["_id"] = ObjectId(value)
        elif key == "_id" and isinstance(value, dict):
            for subkey in value:
                if subkey in ["$in", "$nin"] and isinstance(value[subkey], list):
                    value[subkey] = [ObjectId(id) for id in value[subkey]]
    return query

def convert_ids_to_str(data):
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and '_id' in item:
                item['_id'] = str(item['_id'])
    elif isinstance(data, dict):
        if '_id' in data:
            data['_id'] = str(data['_id'])
    return data