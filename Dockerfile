FROM node:8.11.2-alpine as builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN cd /app && npm set progress=false && npm install
COPY . /app
RUN cd /app && npm run build

FROM nginx:1.13.12-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
