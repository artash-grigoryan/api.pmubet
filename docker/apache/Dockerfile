FROM php:7.2-apache

RUN apt-get clean
RUN apt-get update

RUN apt-get install -y \
        libzip-dev \
        zip unzip git\
  && docker-php-ext-configure zip --with-libzip \
  && docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*

COPY docker/apache/default /etc/apache2/sites-available/default.conf
RUN a2ensite default


COPY --chown=www-data:www-data . /var/www

#//////////////CRON//////////////////////////////////////////////
RUN apt-get update && apt-get -y install cron

# Copy hello-cron file to the cron.d directory
COPY docker/apache/cron /etc/cron.d/cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/cron

# Apply cron job
RUN crontab /etc/cron.d/cron
#////////////////////////////////////////////////////////////////

WORKDIR /var/www/

RUN cd dzio_api && composer install

RUN a2enmod rewrite

EXPOSE 80
