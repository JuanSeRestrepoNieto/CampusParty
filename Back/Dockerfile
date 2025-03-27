FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 4000
