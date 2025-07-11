from typing import List, Optional
from starlette.config import Config
import os

APP_VERSION = "0.1"
APP_NAME = "Knitting utils - API"
API_PREFIX = "/api"

config = Config(".configuration")


MONGO_DETAILS: str = config("MONGO_DETAILS", cast=str)
DB_NAME: str = config("DB_NAME", cast=str)
LOG_LEVEL: str = config("LOG_LEVEL", cast=str, default="INFO")
SECRET_KEY: str = config("SECRET_KEY", cast=str)