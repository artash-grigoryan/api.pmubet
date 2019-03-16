FROM openjdk:7-jdk-jessie


RUN apt-get update && apt-get install -y \
        net-tools \
        psmisc \
        zip unzip

COPY RecXML_V7_0_0_PROD.zip /

RUN mkdir -pv /opt/recxml_root
RUN unzip RecXML_V7_0_0_PROD.zip -d /opt

#RUN ls -la

COPY recXML_start /usr/local/bin/recXML_start
COPY recXML_stop /usr/local/bin/recXML_stop
COPY recxml.properties /opt/RecXML_V7_0_0_PROD/recxml.properties

RUN chmod 755 /usr/local/bin/recXML_st*

#CMD ["/usr/local/bin/recXML_start"]

EXPOSE 80
