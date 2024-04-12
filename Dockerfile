FROM node:slim as node

RUN apt-get update -y

WORKDIR /angular
COPY . /angular

RUN npm install -g @angular/cli

RUN npm install

RUN ng config -g cli.warnings.versionMismatch false
RUN ng build --configuration development --optimization false


FROM nginx:latest as runtime

COPY --from=node /angular/angularsite-develop/dist/angular-site /usr/share/nginx/html
