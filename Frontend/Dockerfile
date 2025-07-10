# Utilizar una imagen de NodeJS como base
FROM node:18
 
# Establecer el directorio de trabajo
WORKDIR /app
 
# Copiar los archivos necesarios para construir la app
COPY package*.json ./
COPY . .
 
# Instalar dependencias y construir la app
RUN npm install --force
RUN npm run build
 
# Exponer el puerto
EXPOSE 5173
 
# Iniciar la aplicación
CMD ["npm", "run", "start", "--host"]