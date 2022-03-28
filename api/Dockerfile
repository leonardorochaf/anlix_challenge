FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig-build.json .

RUN npm ci

COPY src ./src

RUN npm run build

########################################################

FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ormconfig.js .

RUN npm ci --production

COPY --from=0 /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
