FROM php:7.2-apache

RUN apt-get clean
RUN apt-get update

RUN apt-get install -y \
        sudo \
        libzip-dev \
        zip unzip git\
  && docker-php-ext-configure zip --with-libzip \
  && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*

COPY docker/apache/default /etc/apache2/sites-available/default.conf
RUN a2ensite default
RUN a2enmod rewrite

#Nodejs install
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g webpack
RUN npm install sass

COPY --chown=www-data:www-data . /var/www

WORKDIR /var/www/

RUN cd dzio_api && composer install

RUN cd dzio_website && npm install && npm run build

EXPOSE 80