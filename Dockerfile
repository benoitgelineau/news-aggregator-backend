FROM node:14-alpine

ARG APP_DIR

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
COPY package.json yarn.lock $APP_DIR/

RUN yarn install

COPY . $APP_DIR/

CMD ["yarn", "start"]
