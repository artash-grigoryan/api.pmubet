#!/bin/bash
DIR=${PWD##*/}

function php { docker exec -it -u www-data  ${DIR}_www_1 /bin/bash -c "php $*"; };
function artisan { docker-compose run --rm api  /bin/bash -c "cd api;php artisan $*"; };
function composer { docker-compose run --rm api  /bin/bash -c "cd api;COMPOSER_VENDOR_DIR=/var/www/api/vendor composer $*"; };
#function npm {   docker-compose run --rm  react  /bin/bash -c "npm $*"; };
#function gulp {   docker-compose run --rm  gulp  /bin/bash -c "gulp $*"; };
