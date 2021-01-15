import * as _ from "lodash";
import * as fetch from "node-fetch";
import dato from "./keys.json";

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
        Authorization: `Bearer ${dato}`
      },
      body: JSON.stringify({
        query: `query MyQuery ${query}`
      })
    });
    const { data } = await res.json();
    resolve(data);
  });
}

export const getViews = () =>
  new Promise(async (resolve, reject) => {
    const data: any = await DatoData(`{
      allResponses(first: "100") {
        pathname {
          pathName
        }
        response {
          audioResponse {
            url
          }
          textResponse
        }
      }
      gameConfig {
        disableVoiceOvers
      }
    }`);
    const gameReprompt = data.allResponses.find(f => f.pathname.pathName === "Game.Reprompt.ask");
    const getResponse = m =>
      m.audioResponse && !data.gameConfig.disableVoiceOvers && m.audioResponse.url
        ? `<audio src="${m.audioResponse.url}"/>`
        : m.textResponse;
    const viewsObj = {
      Game: {
        TaskSay: {
          say: ["{task}"]
        },
        TaskAsk: {
          ask: ["{task}"],
          reprompt: gameReprompt.response.map(m => `${getResponse(m)} {repromptAudio}`)
        }
      }
    };
    data.allResponses.forEach(e => {
      const pathName = e.pathname.pathName;
      const response = e.response.map(m => getResponse(m));
      if (pathName.includes(".ask")) {
        _.set(viewsObj, `${pathName.replace(".ask", ".reprompt")}`, response);
      }
      _.set(viewsObj, `${pathName}`, response);
    });
    return resolve({
      en: { translation: viewsObj }
    });
  });

export const getGameContent = async () => {
  const data: any = await DatoData(`{
    gameConfig {
      activityOrder
      daysBetweenIdleMessage
      expertUserExpiry
      disableVoiceOvers
      repromptAudioTrack {
        url
      }
    }
    allActivities(first: "100") {
      activityName
      id
      textToSpeech
      isTimedActivity
      activityType {
        activityType
      }
      audioFile {
        url
      }
      musicTrack {
          url
      }
    }
    allBadges {
      badgeName
      id
      probability
      bodyText
      badgeImage {
        url
      }
    }
    screen {
      backButton
      backgroundImage {
        alt
        url
        responsiveImage(imgixParams: {bri: "-30", blur: "70", dpi: "80", auto: compress}) {
          src
        }
      }
      badgeScreenText
      primaryText
      secondaryText
      tertiaryText
      titleText
      screenType {
        screenType
      }
    }
  }`);
  return data;
};
