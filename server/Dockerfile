FROM node:slim
WORKDIR /app
COPY package.json /app
COPY /dist /app/dist
COPY /src /app/src
COPY /prisma /app/prisma/
COPY /tsconfig.json /app/tsconfig.json
RUN npm install
RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
RUN npx tsc
