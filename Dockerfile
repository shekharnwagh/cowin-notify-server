# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# APP Environment
ENV APP_ENV="staging"

# HUSKY Disable Hooks
ENV HUSKY=0

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     && npm ci \
#     && apk del build-dependencies
# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci
RUN npm ci --only=production --ignore-scripts

# Copy local code to the container image.
COPY . ./

# Typescript
RUN npm run build

EXPOSE 8080

# Run the web service on container startup.
CMD [ "node", ".build/server.js" ]
