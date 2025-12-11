FROM  node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install
#RUN npm ci --omit=Dev

COPY src ./src

EXPOSE 3002

CMD ["node", "src/mini-server.js"]

