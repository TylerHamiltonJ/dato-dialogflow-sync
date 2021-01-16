# #!/usr/bin/env bash
set -euo pipefail
set -o xtrace

gcloud auth activate-service-account --key-file dialogFlow_key.json

(cd output && zip -r ../archive.zip .)

export GOOGLE_APPLICATION_CREDENTIALS="$PWD/dialogFlow_key.json"
echo "Sending the model to dialogflow console"
curl https://dialogflow.googleapis.com/v2beta1/projects/versa-website-2021-qmma/agent:import -X POST -H 'Authorization: Bearer '$(gcloud auth application-default print-access-token) -H 'Accept: application/json' -H 'Content-Type: application/json' --compressed --data-binary "{'agentContent': '$(cat $PWD/archive.zip | base64 -b 0)'}"