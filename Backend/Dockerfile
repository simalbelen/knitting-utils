FROM python:3.10.5-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    libtool
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "users_service.main:app", "--host", "0.0.0.0", "--port", "8000"]
