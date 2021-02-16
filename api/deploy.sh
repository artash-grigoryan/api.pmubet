#! /bin/bash
# CONF
API_PATH=/var/www/api.pmubet.com
PATH_RELEASES=/var/www/api.pmubet.com/releases
SHARED_PATH=/var/www/api.pmubet.com/shared

# remove old releases
echo "Sharing images"
for d in $PATH_RELEASES/*/; do
    echo "  Copying ${d}/public/img"
    if [ -d "${d}/public/img" ]; then
      cp -R "${d}/public/img" "$SHARED_PATH"
    fi
done

# move "current" link to current release
echo "copying shared"
rm -rf "$API_PATH/current/public/img"
ln -s "$SHARED_PATH/img" "$API_PATH/current/public"

echo ""
