FROM nginx
RUN useradd --create-home -s /bin/bash user
WORKDIR /home/user
USER user
COPY ./build /usr/share/nginx/html
CMD 'nginx'


