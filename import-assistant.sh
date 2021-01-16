# #!/usr/bin/env bash
set -euo pipefail
set -o xtrace

# if [ "$BITBUCKET_BRANCH" == "master" ] ;
# then
#   export STAGE=staging
#   export NODE_ENV=staging
#   export ASSISTANT_MODEL=staging
#   export PROJECT_ID=${DEV_GOOGLE_PROJECT_ID}
# elif [ "$BITBUCKET_BRANCH" == "production" ] ;
# then
#   export STAGE=production
#   export NODE_ENV=production
#   export ASSISTANT_MODEL=production
#   export PROJECT_ID=${PROD_GOOGLE_PROJECT_ID}
# elif [ "$BITBUCKET_BRANCH" == "voxa-cli-pipeline" ] ;
# then
#   export STAGE=production
#   export NODE_ENV=production
#   export ASSISTANT_MODEL=production
#   export PROJECT_ID=${PROD_GOOGLE_PROJECT_ID}
# fi

export STAGE=production
export NODE_ENV=production
# export ASSISTANT_MODEL=production
export PROJECT_ID="versa-website-2021-qmma"

# Activate gcloud auth service account
gcloud auth activate-service-account --key-file dialogFlow_key.json
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/dialogFlow_key.json"

# Navigate to speech assets folder of current stage
cd output && zip --recurse-paths "archive.zip" "./"

# Zip the assistant package


# Prepare content to restore Dialogflow agent and restore agent
echo "Restoring $STAGE Dialogflow agent"
AGENT_CONTENT="$(base64 archive.zip)"
AUTHORIZATION="$(gcloud auth application-default print-access-token)"

curl https://dialogflow.googleapis.com/v2/projects/$PROJECT_ID/agent:restore -X POST -H "Authorization: Bearer $AUTHORIZATION" -H "Accept: application/json" -H "Content-Type: application/json" --compressed --data-binary @- <<CURL_DATA
{"agentContent": "$AGENT_CONTENT"}
CURL_DATA