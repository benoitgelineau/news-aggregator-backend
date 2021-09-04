FROM node:14

ARG APP_DIR

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
COPY package.json $APP_DIR/

RUN yarn install

COPY . $APP_DIR/

CMD ["yarn", "start"]
