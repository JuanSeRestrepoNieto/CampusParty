# Usa una imagen base de Node.js para compilar la aplicación
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o pnpm/yarn.lock si usas otro gestor de paquetes)
COPY package*.json ./

# Instala las dependencias
RUN npm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Asegurar que TypeScript está instalado globalmente (si es necesario)
RUN npm install -g typescript

# Compila la aplicación
RUN npm run build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de compilación al servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
