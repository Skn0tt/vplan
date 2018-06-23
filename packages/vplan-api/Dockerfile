FROM node:9
WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json lerna.json ./

COPY packages/vplan-api ./packages/vplan-api
COPY packages/vplan-types ./packages/vplan-types
COPY packages/vplan-parser ./packages/vplan-parser
COPY packages/vplan-util ./packages/vplan-util

RUN yarn --frozen-lockfile
RUN yarn lerna bootstrap

RUN yarn --cwd packages/vplan-api build
RUN yarn --cwd packages/vplan-types build
RUN yarn --cwd packages/vplan-parser build
RUN yarn --cwd packages/vplan-util build

HEALTHCHECK CMD curl --fail http://localhost:3000/status || exit 1

EXPOSE 3000
CMD [ "yarn", "--cwd", "packages/vplan-api", "start" ]
