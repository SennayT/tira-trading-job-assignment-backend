# syntax=docker/dockerfile:1

FROM node:20.11.1 AS base

WORKDIR /app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN corepack enable

RUN corepack prepare pnpm@8.15.4 --activate

RUN pnpm install

COPY prisma ./prisma/

RUN pnpm prisma generate

COPY . .

FROM base AS local
ENV NODE_ENV=development
CMD [ "pnpm", "start:dev" ]

FROM base as studio
CMD [ "pnpm", "prisma studio"]

FROM base AS development
ENV NODE_ENV=staging
CMD [ "pnpm", "start"]

FROM dev AS test
ENV NODE_ENV=test
CMD [ "pnpm", "test" ]

FROM base AS production
ENV NODE_ENV=production
RUN pnpm run build
RUN pnpm install --frozen-lockfile --production
CMD [ "pnpm", "start:prod" ]

FROM base AS staging
ENV NODE_ENV=staging
RUN pnpm run build
RUN pnpm install --frozen-lockfile --production
CMD [ "pnpm", "start:prod" ]