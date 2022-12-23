FROM node as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
ENV REACT_APP_API_URL='https://xn--c1adkkfibdd6ae2ij.xn--p1ai/api'
ENV REACT_APP_SERVER_URL='https://xn--c1adkkfibdd6ae2ij.xn--p1ai'
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
