#! /bin/bash

ROOT=${BASH_SOURCE%/*}
. $ROOT/__functions

# CONF
PATH=/var/www/api.pmubet.com
PATH_RELEASES=/var/www/api.pmubet.com/releases
SHARED_PATH=/var/www/api.pmubet.com/shared


# remove old releases
title "Removing old releases:"
while [ $(ls -1 $PATH_RELEASES | wc -l) -gt $KEEP_RELEASES ]; do
    oldest=$(ls -1 $PATH_RELEASES | head -1)
    echo "  Copying $oldest"
    cp -R "$PATH_RELEASES/$oldest/public/img" "$SHARED_PATH"
done

# move "current" link to current release
title "copying shared"
cp -s "$SHARED_PATH/img" "$PATH/current/public"

echo ""
