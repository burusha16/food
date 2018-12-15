FROM node:10-alpine as buildContainer
WORKDIR /tmp

COPY . /tmp
RUN npm install
RUN npm run build:universal
RUN npm run generate:prerender

FROM node:8-alpine
WORKDIR /img

COPY --from=buildContainer /tmp/package.json /img
COPY --from=buildContainer /tmp/server.js /img
COPY --from=buildContainer /tmp/dist /img/dist

# Test for heroku env
#RUN adduser -D myuser
#USER myuser
#CMD gunicorn --bind 0.0.0.0:$PORT wsgi

CMD ["npm", "run", "server"]
