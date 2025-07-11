from fastapi import HTTPException, Request
from app.utils.jwt_utils import validate_token
import jwt
from app import config
import datetime

async def ensure_authenticated(request: Request):
    if 'Authorization' not in request.headers:
        raise HTTPException(status_code=403, detail="Your request has no authorization header")
    
    token = request.headers["Authorization"].split(" ")[1]

    try:
        decoded = validate_token(token, True)
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="You don't have permission to do this operation")    
    return decoded 

async def ensure_admin_authenticated(request: Request):

    decoded = await ensure_authenticated(request)
    
    if not decoded.get("isAdmin"):
        raise HTTPException(status_code=401, detail="You don't have permission to do this operation")    
    return decoded


def create_jwt_token(data, hours=24):
    expiration = int((datetime.datetime.utcnow() + datetime.timedelta(hours=hours)).timestamp())
    payload = {
        'exp': expiration,
        'data':data
    }
    return jwt.encode(payload, config.SECRET_KEY, algorithm='HS256'), expiration

def decode_jwt_token(token):
    return jwt.decode(token, config.SECRET_KEY, algorithms=["HS256"])

