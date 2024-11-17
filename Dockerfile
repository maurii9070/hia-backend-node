# Usar la imagen base de Bitnami para Node.js
FROM bitnami/node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que tu aplicación se ejecuta
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
