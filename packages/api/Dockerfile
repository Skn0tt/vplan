FROM node
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY lerna.json ./

COPY packages/api ./packages/api
COPY packages/types ./packages/types
COPY packages/parser ./packages/parser
COPY packages/util ./packages/util

RUN yarn
RUN yarn lerna bootstrap

RUN yarn --cwd packages/api build
RUN yarn --cwd packages/types build
RUN yarn --cwd packages/parser build
RUN yarn --cwd packages/util build

HEALTHCHECK CMD curl --fail http://localhost:3000/status || exit 1

EXPOSE 3000
CMD [ "yarn", "--cwd", "packages/api", "start" ]
