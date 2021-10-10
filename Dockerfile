FROM node:12.16.3

WORKDIR /bravi-api

ENV PORT 80

COPY package.json /bravi-api/package.json

RUN npm install

COPY . /bravi-api

CMD ["node", "src/server.js"]
