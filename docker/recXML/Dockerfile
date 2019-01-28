FROM openjdk:7-jdk-jessie


RUN apt-get update && apt-get install -y \
        net-tools \
        psmisc \
        zip unzip

RUN curl -sS https://www.dropbox.com/s/ew8u86dvflc2i3r/RecXML_V7_0_0_PROD.zip?dl=0 | unzip RecXML_V7_0_0_PROD.zip -d /opt
RUN mkdir /opt/recxml_root

COPY recXML_start /usr/local/bin/recXML_start
COPY recXML_start /usr/local/bin/recXML_start
COPY recxml.properties /opt/RecXML_V7_0_0_PROD/recxml.properties

EXPOSE 80
