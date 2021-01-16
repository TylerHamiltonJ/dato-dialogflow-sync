import * as fetch from "node-fetch";
const config: { [key: string]: any } = require("./config.json");

export default async function DatoLog(status, url) {
  console.log("API - Sending build trigger logs");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });
}

const updateDato = async (code, url) => {
  if (code === "0") {
    await DatoLog("success", url);
  } else {
    await DatoLog("error", url);
  }
};
if (process.env.BITBUCKET_EXIT_CODE) {
  if (process.env.BITBUCKET_BRANCH === "master") {
    updateDato(process.env.BITBUCKET_EXIT_CODE, config.datoURL);
  }
}
