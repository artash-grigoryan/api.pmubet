FROM php:7.1.2-apache
RUN a2enmod rewrite
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        zip unzip \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#cd /tmp && curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*
COPY default /etc/apache2/sites-available/default.conf
RUN a2ensite default

#CMD "source /etc/apache2/envvars && apache2 -DFOREGROUND"
ENV LANG en_US.UTF-8

# forward request and error logs to docker log collector

EXPOSE 80
