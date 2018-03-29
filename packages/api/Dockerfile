FROM node
WORKDIR /usr/src/app

RUN yarn global add lerna

COPY package.json ./
COPY tsconfig.json ./

RUN yarn install

COPY packages/api ./packages/api
COPY packages/types ./packages/types
COPY packages/parser ./packages/parser
COPY packages/util ./packages/util

COPY lerna.json ./

RUN lerna bootstrap

RUN yarn --cwd packages/api build
RUN yarn --cwd packages/types build
RUN yarn --cwd packages/parser build
RUN yarn --cwd packages/util build

HEALTHCHECK CMD curl --fail http://localhost:3000/status || exit 1

EXPOSE 3000
CMD [ "yarn", "--cwd", "packages/api", "start" ]
