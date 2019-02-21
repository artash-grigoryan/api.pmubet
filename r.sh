#!/bin/sh
RANCHER_URI=$1
ENVIRONMENT_ID=$2
SERVICE_ID=$3
NEWIMAGE=$4

endpoint="$RANCHER_URI/v1/projects/$ENVIRONMENT_ID/services/$SERVICE_ID"

serviceJson=$(curl -s  "$endpoint" | jq '.launchConfig' -r)

newServiceJson=$(jq -n  --argjson config "$serviceJson" --arg image "docker:$NEWIMAGE"   '$config | .imageUuid=$image')

payload=$(jq -n --argjson previousLaunchConfig "$serviceJson" --argjson launchConfig "$newServiceJson" '{ "inServiceStrategy":  { "batchSize": 1,"intervalMillis": 2000,"launchConfig" : $launchConfig, "previousConfig" : $previousLaunchConfig,"startFirst": true },"toServiceStrategy": null }' -r)

deployStatus=$(curl -s -o /dev/null -w "%{http_code}" -XPOST -H 'Content-Type: application/json'  "$endpoint/?action=upgrade" -d "$payload")

if [ "${deployStatus}" = "200" ] || [ "${deployStatus}" = "201"  ]; then
    echo "deploying $NEWIMAGE :) check rancher"
fi
