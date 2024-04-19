FROM node:18.16.0 

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY dist /app/dist

RUN yarn install --production

CMD ["node", "dist/server.js"]
