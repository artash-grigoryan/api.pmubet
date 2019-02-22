#!/bin/bash
DIR=${PWD##*/}

function php { docker exec -it -u www-data  ${DIR}_www_1 /bin/bash -c "php $*"; };
function artisan { docker-compose run --rm www  /bin/bash -c "cd dzio_api;php artisan $*"; };
function composer { docker-compose run --rm www  /bin/bash -c "cd dzio_api;COMPOSER_VENDOR_DIR=/var/www/dzio_api/vendor composer $*"; };
#function npm {   docker-compose run --rm  gulp  /bin/bash -c "npm $*"; };
#function gulp {   docker-compose run --rm  gulp  /bin/bash -c "gulp $*"; };
