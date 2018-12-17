FROM nimmis/apache

MAINTAINER nimmis <kjell.havneskold@gmail.com>

# disable interactive functions
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
apt-get install -y php libapache2-mod-php  \
php-fpm php-cli php-mysqlnd php-pgsql php-sqlite3 php-redis \
php-apcu php-intl php-imagick php-mcrypt php-json php-gd php-curl && \
phpenmod mcrypt && \
rm -rf /var/lib/apt/lists/* && \
cd /tmp && curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN rm /etc/apache2/sites-*/*
COPY default /etc/apache2/sites-available/default.conf
RUN a2ensite default

#CMD "source /etc/apache2/envvars && apache2 -DFOREGROUND"
ENV LANG en_US.UTF-8

# forward request and error logs to docker log collector

EXPOSE 80
