from pymongo import MongoClient
from loguru import logger

import time

def connect_database(url, max_retries=3, retry_delay=1):
    
    retries = 0

    logger.info(f"Connecting Database")
    while retries < max_retries:
        try:
            return MongoClient(url)
        
        except Exception as e:
            retries += 1
            logger.error(f"Failed to connect to database. Retrying... {retries}/{max_retries}")
            time.sleep(retry_delay)

def disconnect_database(client):
    client.close()