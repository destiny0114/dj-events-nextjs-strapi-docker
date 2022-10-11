FROM node:16

RUN apt-get update && apt-get install libvips-dev -y

RUN mkdir -p /app

WORKDIR /app

COPY package*.json yarn.lock ./

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && yarn install

COPY . .

EXPOSE 1337

ENV NODE_ENV=${NODE_ENV}

RUN yarn build

CMD ["yarn", "start"]
