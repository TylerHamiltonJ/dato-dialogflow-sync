import * as _ from "lodash";
import * as fetch from "node-fetch";
const config: { [key: string]: any } = require("./config.json");

// This file reads from the Dato api and converts everything into a voxa-friendly format.
// The views object that is rendered here also contains many responses that aren't
// included in DatoCMS that are required to keep the game running.
// Edit at your own risk!

export default async function DatoData(query: string) {
  return new Promise(async resolve => {
    const res = await fetch(`https://graphql.datocms.com`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${config.dato}`
      },
      body: JSON.stringify({
        query: `query MyQuery ${query}`
      })
    });
    const { data } = await res.json();
    resolve(data);
  });
}

export const getIntent = async () => {
  const data: any = await DatoData(`{
    allIntents(first: "100") {
      intentName
      event
      priority
      entities {
        id
        name
      }
      utterance
    }
    allEntities(first: "100") {
      id
      name
      value {
        synonyms
        key
      }
    }
    agent {
      analyzeQueryTextSentiment
      defaultTimezone
      description
      disableInteractionLogs
      disableStackdriverLogs
      displayName
      enableOnePlatformApi
      examples
      isPrivate
      language
      linkToDocs
      mlMinConfidence
      onePlatformApiVersion
      shortDescription
      supportedLanguages
      updatedAt
    }
    allFaqs(first: "100") {
      intent {
        intentName
      }
      response {
        pathname {
          pathName
        }
      }
    }
    allResponses(first: "100") {
      pathname {
        pathName
      }
      response {
        textResponse
      }
    }
  }
  `);
  return data;
};
