FROM node:18-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

CMD ["npm", "run", "start"]
