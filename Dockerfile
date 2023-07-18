
FROM node:18.16.1 AS builder
WORKDIR /myapp
COPY package*.json ./
RUN npm install
COPY . .
FROM alpine as production
WORKDIR /app
COPY --from=builder /myapp ./
CMD ["npm", "run", "docker:dev"]








