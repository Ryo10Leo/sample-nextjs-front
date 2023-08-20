FROM node:18.17.1-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build && \
    npm ci --omit=dev

EXPOSE 3000

CMD [ "npm", "run", "start" ]
