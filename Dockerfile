FROM node:20.18-alpine3.19 AS development

WORKDIR  usr/app

COPY package*.json ./

RUN npm ci

COPY . . 

FROM node:20.18-alpine3.19 AS build

WORKDIR  usr/app

COPY package*.json ./

COPY --from=development usr/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:20.18-alpine3.19 AS production

COPY --from=build usr/app/node_modules ./node_modules

COPY --from=build usr/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]