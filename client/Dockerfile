# Pull offial base image.
FROM node:lts-alpine3.19

# Setup working directory.
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment.
COPY package*.json ./

# Installs all node packages.
RUN npm install

# Setup ENV variables.
ARG REACT_APP_APP_NAME
ARG REACT_APP_APP_VERSION
ARG REACT_APP_SERVER_URL
ENV REACT_APP_APP_NAME=$REACT_APP_APP_NAME
ENV REACT_APP_APP_VERSION=$REACT_APP_APP_VERSION
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Copies everything over to Docker environment
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3000

# Run application
#CMD [ "npm", "start" ]
# CMD serve -s build