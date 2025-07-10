from fastapi import FastAPI
from app.api.v1 import project

app = FastAPI(title="Knitting utils API")

app.include_router(project.router)
