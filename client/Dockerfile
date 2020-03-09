FROM node:alpine

WORKDIR /app/client

COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build
RUN yarn global add serve

CMD [ "serve","build" ]