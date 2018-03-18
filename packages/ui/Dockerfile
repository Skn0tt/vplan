FROM socialengine/nginx-spa

# Install Curl (for Healthcheck)
RUN apt-get update; apt-get -y install curl;

# Copy over static content
COPY ./dist/ /app/

HEALTHCHECK CMD curl --fail -A "healthcheck" http://localhost || exit 1