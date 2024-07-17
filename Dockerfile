FROM node:20-bookworm AS build

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

USER node

FROM build AS dev
