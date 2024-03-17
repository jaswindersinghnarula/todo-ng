# Pull offial base image.
FROM node:lts-alpine3.19

# Setup working directory.
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment.
COPY package*.json ./

# Installs all node packages.
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Prisma Generate.
RUN npx prisma generate

# Compile project.
RUN npx tsc

# Install dependencies.
RUN apk update && apk add openssl && apk add bash

# Uses port which is used by the actual application.
EXPOSE 3002