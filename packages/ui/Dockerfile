FROM node as build
WORKDIR /usr/src/app

RUN yarn global add lerna

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY lerna.json ./

RUN yarn install

COPY packages/ui ./packages/ui
COPY packages/types ./packages/types
COPY packages/redux ./packages/redux
COPY packages/util ./packages/util

RUN lerna bootstrap

RUN yarn --cwd packages/ui build

FROM socialengine/nginx-spa

# Install Curl (for Healthcheck)
RUN apt-get update; apt-get -y install curl;

# Copy over static content
COPY --from=build /usr/src/app/packages/ui/dist /app/

HEALTHCHECK CMD curl --fail -A "healthcheck" http://localhost || exit 1