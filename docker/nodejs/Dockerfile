FROM  debian:jessie

RUN apt-get update
RUN apt-get install -y --force-yes curl sudo

RUN apt-get install -y make git locales gcc g++
RUN echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
ENV LC_ALL fr_FR.UTF-8

#sassc
RUN git clone https://github.com/sass/libsass.git && \
    export SASS_LIBSASS_PATH=/libsass && \
    git clone https://github.com/sass/sassc.git && \
    cd ./sassc && make -j $(nproc) && make install && \
    cd / && rm -rf sassc libsass

#sass
RUN apt-get install make ruby ruby-dev -y && \
    gem install sass

#Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g webpack

EXPOSE 80