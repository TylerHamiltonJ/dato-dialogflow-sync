export PROJECTNAME=datocms-template-alll

gcloud auth activate-service-account --key-file client_secret.json
echo "$PWD/client_secret.json"
# echo "Zipping interaction model to /speech-assets/dialogflow/dev.zip"
# zip -r speech-assets/dialogflow/dialogflow.zip speech-assets/dialogflow/dev/
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/client_secret.json"
echo $GOOGLE_APPLICATION_CREDENTIALS
# curl https://dialogflow.googleapis.com/v2beta1/projects/$PROJECTNAME/agent:export -X POST -H 'Authorization: Bearer '$(gcloud auth application-default print-access-token) -H 'Accept: application/json' -H 'Content-Type: application/json' > agent.json
# jq .response.agentContent agent.json | base64 --decode
curl https://dialogflow.googleapis.com/v2beta1/projects/$PROJECTNAME/agent:export -X POST -H 'Authorization: Bearer '$(gcloud auth print-access-token) -H 'Accept: application/json' -H 'Content-Type: application/json' --compressed --data-binary '{}' | grep agentContent | sed -e 's/.*"agentContent": "\([^"]*\)".*/\1/' | base64 --decode > agent.zip
unzip -o agent.zip -d input