FROM nginx:stable

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD openshift-navigate-client/nginx.conf /etc/nginx/

ADD openshift-navigate-client/build /var/www

# Append "daemon off;" to the beginning of the configuration
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx

USER www-data

VOLUME /var/www

# Expose ports
# EXPOSE 90

# Set the default command to execute
# when creating a new container
# CMD service nginx start
