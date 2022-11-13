# Based on Ubuntu
FROM nginx
COPY .  /usr/share/nginx/html/
# Expose ports
EXPOSE 8001
CMD service nginx start
