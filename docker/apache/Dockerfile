FROM php:7

RUN a2enmod rewrite
RUN apt-get update -y && apt-get install -y openssl zip unzip git
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#cd /tmp && curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*

COPY docker/apache/default /etc/apache2/sites-available/default.conf
RUN a2ensite default

#CMD "source /etc/apache2/envvars && apache2 -DFOREGROUND"
ENV LANG en_US.UTF-8

RUN ls -la
COPY --chown=www-data:www-data . /var/www


WORKDIR /var/www/
RUN ls -la

RUN cd dzio_api && composer install

EXPOSE 80
