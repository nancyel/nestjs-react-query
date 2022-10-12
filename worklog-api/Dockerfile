FROM node:14.15 as builder

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:slim as runtime

WORKDIR /app

ENV NODE_ENV="development"

COPY --from=builder "/app/dist" "/app/dist"
COPY --from=builder "/app/src/config/.env.development" "/app/src/config/.env.development"
COPY --from=builder "/app/node_modules/" "/app/node_modules"
COPY --from=builder "/app/package.json" "/app/package.json"
COPY --from=builder "/app/tsconfig.build.json" "/app/tsconfig.build.json"

EXPOSE 3000

CMD ["yarn", "start:prod"]