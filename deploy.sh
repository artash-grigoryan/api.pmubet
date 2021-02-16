#! /bin/bash

ROOT=${BASH_SOURCE%/*}
. $ROOT/__functions

# CONF
PATH_BUILD=/var/www/api/build
PATH_RELEASES=/var/www/api/releases
CURRENT_RELEASE_LINK=/var/www/api.pmubet.com
SHARED_PATH=/var/www/api.pmubet.com/shared

KEEP_RELEASES=5

# CURRENT VARIABLES
CURRENT_RELEASE=$(date '+%F_%H-%M-%S')

# Check if releases directory exists
if [ ! -d "$PATH_RELEASES" ]
then
    die "Error: Directory $PATH_RELEASES does not exists."
fi

# Check if current release directory already exists
if [ -d "$PATH_RELEASES/$CURRENT_RELEASE" ]
then
    die "Error: Directory $PATH_RELEASES/$CURRENT_RELEASE already exists."
fi

if [ ! -d "$PATH_BUILD" ]
then
    die "Error: Directory $PATH_BUILD does not exists."
fi

title "Creating release $CURRENT_RELEASE"
mv "$PATH_BUILD" "$PATH_RELEASES/$CURRENT_RELEASE"

title "Copying to shared img folder"
mv "$CURRENT_RELEASE_LINK/public/img" "$SHARED_PATH"

# move "current" link to current release
title "Publishing release"
rm -f "$CURRENT_RELEASE_LINK"
ln -s "$PATH_RELEASES/$CURRENT_RELEASE" "$CURRENT_RELEASE_LINK"

# remove old releases
title "Removing old releases:"
while [ $(ls -1 $PATH_RELEASES | wc -l) -gt $KEEP_RELEASES ]; do
    oldest=$(ls -1 $PATH_RELEASES | head -1)
    echo "  > remove $oldest"
    rm -rf "$PATH_RELEASES/$oldest"
done

echo ""
