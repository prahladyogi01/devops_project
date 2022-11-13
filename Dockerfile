FROM nginx
COPY .  /usr/share/nginx/html/
EXPOSE 8001
CMD service nginx start
