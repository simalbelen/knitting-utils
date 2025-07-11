from typing import Callable

from fastapi import FastAPI
from loguru import logger

from app.config import MONGO_DETAILS, DB_NAME
from app.infrastructure.database import connect_database, disconnect_database

#ESTA VARIABLE GLOBAL, SE QUITARA MAS ADELANTE
 


def _connect_database(app: FastAPI) -> None:
    """
    Starts the model for the FastAPI application.

    Args:
    app (FastAPI): The FastAPI application instance.
    """
    db_url = MONGO_DETAILS
    db_name = DB_NAME

    app.state.db_client = connect_database(db_url)
    app.state.db = app.state.db_client[db_name]

    

def _disconnect_database(app: FastAPI) -> None:
    """
    Shuts down the model for the FastAPI application.

    Args:
    app (FastAPI): The FastAPI application instance.
    """
    disconnect_database(app.state.db_client)


def start_app_handler(app: FastAPI) -> Callable:
    """
    Initializes the startup process for the FastAPI application.

    Args:
    app (FastAPI): The FastAPI application instance.

    Returns:
    Callable: The startup function.
    """
    def startup() -> None:
        logger.info("Running app connecting database.")
        _connect_database(app)
        logger.info("Setup completed.")
    return startup


def stop_app_handler(app: FastAPI) -> Callable:
    """
    Initializes the shutdown process for the FastAPI application.

    Args:
    app (FastAPI): The FastAPI application instance.

    Returns:
    Callable: The shutdown function.
    """

    async def shutdown() -> None:
        logger.info("Running down app disconnecting database.")
        _disconnect_database(app)

    return shutdown