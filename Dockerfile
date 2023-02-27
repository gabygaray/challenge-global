FROM node:18.12-buster-slim

ENV APP $APP

WORKDIR /app
COPY package.json package-lock.json /app/
COPY . /app/
RUN chmod +x /app/docker-entrypoint.sh
RUN npm install
RUN npm run build
ENTRYPOINT ["/app/docker-entrypoint.sh"]