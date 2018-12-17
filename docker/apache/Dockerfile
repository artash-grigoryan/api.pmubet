FROM  debian:jessie

RUN apt-get update
RUN apt-get install -y --force-yes apt-transport-https apache2 php5 php5-cli libicu-dev php5-gd php5-curl php5-mysql php5-memcached php5-intl php5-json php5-mcrypt curl sudo
RUN a2enmod rewrite

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get install -y --force-yes make git locales gcc g++
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL en_US.UTF-8

RUN rm /etc/apache2/sites-*/*
COPY default /etc/apache2/sites-available/default.conf
RUN a2ensite default

CMD "source /etc/apache2/envvars && apache2 -DFOREGROUND"
ENV LANG en_US.UTF-8

# forward request and error logs to docker log collector
RUN ln -sf /proc/1/fd/1 /var/log/apache2/access.log
RUN ln -sf /proc/1/fd/2 /var/log/apache2/error.log

EXPOSE 80
