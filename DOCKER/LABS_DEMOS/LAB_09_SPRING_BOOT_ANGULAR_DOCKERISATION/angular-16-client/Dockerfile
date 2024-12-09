FROM node:latest as build

WORKDIR ./angular-16-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build ./angular-16-client/dist/angular-16-crud /usr/share/nginx/html

EXPOSE 80
