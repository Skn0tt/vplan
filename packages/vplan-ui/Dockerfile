FROM node:9 as build
WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json lerna.json ./

COPY packages/vplan-ui ./packages/vplan-ui
COPY packages/vplan-types ./packages/vplan-types
COPY packages/vplan-redux ./packages/vplan-redux
COPY packages/vplan-util ./packages/vplan-util

RUN yarn --frozen-lockfile
RUN yarn lerna bootstrap

RUN yarn --cwd packages/vplan-ui build

FROM skn0tt/nginx-spa

# Replace Script
COPY packages/vplan-ui/replace.sh /usr/local/bin/replace
RUN sed -e "3i/bin/sh /usr/local/bin/replace" -i /usr/local/bin/start-container

# Install Curl (for Healthcheck)
RUN apt-get update; apt-get -y install curl;

# Copy over static content
COPY --from=build /usr/src/app/packages/vplan-ui/dist /app/

HEALTHCHECK CMD curl --fail -A "healthcheck" http://localhost || exit 1