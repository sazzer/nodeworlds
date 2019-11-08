FROM node:10-buster-slim AS build

WORKDIR /nodeworlds/build
COPY package.json tsconfig.json yarn.lock /nodeworlds/build/
RUN yarn install

COPY src /nodeworlds/build/src
RUN npx tsc

FROM node:10-buster-slim

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /nodeworlds/run
COPY package.json yarn.lock /nodeworlds/run/
RUN yarn install --prod

COPY --from=build /nodeworlds/build/dest /nodeworlds/run/dest
COPY ./config /nodeworlds/run/config
COPY ./migrations /nodeworlds/run/migrations
COPY ./static /nodeworlds/run/static
COPY ./views /nodeworlds/run/views
COPY ./docker/start.sh /nodeworlds/run

CMD ./start.sh
