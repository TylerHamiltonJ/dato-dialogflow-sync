# #!/usr/bin/env bash
set -euo pipefail
set -o xtrace

export PROJECT_ID="versa-website-2021-qmma"

# Activate gcloud auth service account
gcloud auth activate-service-account --key-file dialogFlow_key.json
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/dialogFlow_key.json"

# Navigate to speech assets folder of current stage and Zip the assistant package

cd output && zip --recurse-paths "archive.zip" "./"

# Prepare content to restore Dialogflow agent and restore agent
echo "Restoring Dialogflow agent"
AGENT_CONTENT="$(base64 archive.zip)"
AUTHORIZATION="$(gcloud auth application-default print-access-token)"

curl https://dialogflow.googleapis.com/v2/projects/$PROJECT_ID/agent:restore -X POST -H "Authorization: Bearer $AUTHORIZATION" -H "Accept: application/json" -H "Content-Type: application/json" --compressed --data-binary @- <<CURL_DATA
{"agentContent": "$AGENT_CONTENT"}
CURL_DATA