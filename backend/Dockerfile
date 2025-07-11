# Establece la imagen base
FROM python:3.10.5-slim

RUN mkdir -p /usr/src/app && touch /usr/src/app/configuration.json
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/requirements.txt

# Instala las dependencias desde requirements.txt
RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    libtool \
    wkhtmltopdf
RUN pip3 install --no-cache-dir -r requirements.txt
# RUN apk add -U --no-cache gcc build-base linux-headers ca-certificates libffi-dev libressl-dev libxslt-dev

# RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /usr/src/app


# Expone el puerto en el que se ejecuta el servidor Uvicorn
EXPOSE 8000

# Comando predeterminado para ejecutar el servidor Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]