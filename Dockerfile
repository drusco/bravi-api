FROM node:12.16.3

WORKDIR /bravi-api

COPY package.json /bravi-api

RUN yarn install

COPY . /bravi-api

#DEVELOP
CMD ["yarn", "dev"]

#PRODUCTION
#RUN npm run build
#CMD ["yarn", "start"]
