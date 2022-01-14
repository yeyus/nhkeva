FROM node:16-alpine as typescript-builder

WORKDIR /app

COPY package*.json ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

COPY . .

RUN npm run build

FROM node:16-alpine as release-builder

WORKDIR /app

COPY package*.json ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --production

FROM node:16-alpine as release

WORKDIR /app

COPY --from=typescript-builder /app/package*.json .
COPY --from=typescript-builder /app/dist .
COPY --from=typescript-builder /app/config config
COPY --from=release-builder /app/node_modules ./node_modules

CMD node index.js



