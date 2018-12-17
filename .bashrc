#!/bin/bash
DIR=${PWD##*/}

function php { docker exec -it -u www-data  ${DIR}_www_1 /bin/bash -c "php $*"; };
function composer { docker-compose run --rm www  /bin/bash -c "/usr/local/bin/composer $*"; };
#function npm {   docker-compose run --rm  gulp  /bin/bash -c "npm $*"; };
#function gulp {   docker-compose run --rm  gulp  /bin/bash -c "gulp $*"; };
