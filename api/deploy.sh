#! /bin/bash
# CONF
API_PATH=/var/www/api.pmubet.com
PATH_RELEASES=/var/www/api.pmubet.com/releases
SHARED_PATH=/var/www/api.pmubet.com/shared


# remove old releases
echo "Sharing images"

while [ $(ls -1 $PATH_RELEASES | wc -l) -gt $KEEP_RELEASES ]; do
    oldest=$(ls -1 $PATH_RELEASES | head -1)
    echo "  Copying $oldest"
    cp -R "$PATH_RELEASES/$oldest/public/img" "$SHARED_PATH"
done

# move "current" link to current release
echo "copying shared"
ln -s "$SHARED_PATH/img" "$API_PATH/current/public"

echo ""
