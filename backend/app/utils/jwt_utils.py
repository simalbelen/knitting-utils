from app.config import SECRET_KEY
from fastapi import HTTPException
import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer

def parse_expire_date(minutes: int):
    date = datetime.utcnow()
    new_date = date + timedelta(minutes=minutes)
    return new_date

minutes_in_one_year = 525600
def generate_token(data: dict):
    token = jwt.encode(
        {**data, "exp": parse_expire_date(1440)},
        key=get_key(),
        algorithm="HS256")
    return token

def validate_token(token, output=False):
    try:
        if output:
            return jwt.decode(token, key=get_key(), algorithms=["HS256"])
        jwt.decode(token, key=get_key(), algorithms=["HS256"])
    except jwt.exceptions.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token Expired")
    except Exception as e:
        print(e)
    
def get_key():
    return SECRET_KEY

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")