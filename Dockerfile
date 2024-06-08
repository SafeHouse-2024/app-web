FROM node:20.11.1 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
WORKDIR ./aplicacao
CMD ["node", "app.js"]
EXPOSE 80

FROM nginx:alpine
COPY --from=build /usr/src/app/aplicacao/public/index.html /usr/share/nginx/html