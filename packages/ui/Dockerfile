FROM node as build
WORKDIR /usr/src/app

RUN yarn global add lerna parcel-bundler

COPY package.json ./
COPY tsconfig.json ./ 

RUN yarn install

COPY packages/ui ./packages/ui
COPY packages/types ./packages/types
COPY packages/redux ./packages/redux

COPY lerna.json ./

RUN lerna bootstrap

RUN yarn --cwd packages/types build
RUN yarn --cwd packages/redux build
RUN yarn --cwd packages/ui build

# Host Static Files
FROM nginx:alpine as server

# Install Curl (for Healthcheck)
RUN apk add --no-cache curl

# Copy over static content
COPY --from=build /usr/src/app/packages/ui/dist /usr/share/nginx/html

# Copy Nginx Config
COPY packages/ui/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK CMD curl --fail -A "healthcheck" http://localhost || exit 1

# Run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
