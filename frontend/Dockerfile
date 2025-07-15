# Utilizar una imagen de NodeJS como base
FROM node:22 AS builder
 
# Establecer el directorio de trabajo
WORKDIR /app
 
# Copiar los archivos necesarios para construir la app
COPY package*.json ./
COPY . .
 
# Instalar dependencias y construir la app
RUN npm install --force
RUN npm run build

# Servir el frontend buildeado con nginx dentro del contenedor
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


# # Exponer el puerto
# EXPOSE 5173
 
# # Iniciar la aplicación
# CMD ["npm", "run", "build"]