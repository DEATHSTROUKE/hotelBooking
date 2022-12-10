FROM node as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
ENV REACT_APP_API_URL='http://217.18.61.144:5000/api'
ENV REACT_APP_SERVER_URL='http://217.18.61.144:5000'
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
