from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.requests import Request
from app.logging import configure_logging
from app.api.routes.router import api_router
from app.config import (API_PREFIX, APP_NAME, APP_VERSION)
from app.event_handlers import (start_app_handler,
                                                 stop_app_handler)

def get_app() -> FastAPI:

    configure_logging()
    fast_app = FastAPI(title=APP_NAME, version=APP_VERSION)
    fast_app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],    
    )

    @fast_app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=400,
            content={"message": "An error occurred.", "detail": exc.errors()},
        )

    fast_app.include_router(api_router, prefix=API_PREFIX)
    fast_app.add_event_handler("startup", start_app_handler(fast_app))
    fast_app.add_event_handler("shutdown", stop_app_handler(fast_app))

    return fast_app


app = get_app()