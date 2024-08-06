FROM node:22.5.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "src/server.js"]
