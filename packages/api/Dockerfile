FROM node
WORKDIR /usr/src/app

RUN yarn global add lerna

COPY package.json ./

RUN yarn install

COPY packages/api ./packages/api
COPY packages/types ./packages/types
COPY packages/parser ./packages/parser

COPY lerna.json ./

RUN lerna bootstrap

HEALTHCHECK CMD curl --fail http://localhost:3000/status || exit 1

EXPOSE 3000
CMD [ "yarn", "--cwd", "packages/api", "start" ]
