#FROM php:7
FROM php:7.2-apache

RUN apt-get clean
RUN apt-get update

RUN apt-get install -y \
        libzip-dev \
        zip unzip git\
  && docker-php-ext-configure zip --with-libzip \
  && docker-php-ext-install zip
#RUN apt-get update -y && apt-get install -y openssl zip unzip git
#RUN apt-get update -y && apt-get install -y \
#        libfreetype6-dev \
#        libjpeg62-turbo-dev \
#        libmcrypt-dev \
#        libpng-dev \
#        zip unzip \
#    && docker-php-ext-install -j$(nproc) iconv mcrypt \
#    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
#    && docker-php-ext-install -j$(nproc) gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*

COPY docker/apache/default /etc/apache2/sites-available/default.conf
RUN a2ensite default

#CMD "source /etc/apache2/envvars && apache2 -DFOREGROUND"
#ENV LANG en_US.UTF-8

RUN ls -la
COPY --chown=www-data:www-data . /var/www


WORKDIR /var/www/
RUN ls -la

RUN cd dzio_api && composer install

EXPOSE 80
