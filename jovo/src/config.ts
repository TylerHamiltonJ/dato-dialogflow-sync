// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------
import * as faqs from "./faqs.json";

const config = {
  logging: true,
  intentMap: Object.assign(
    { "AMAZON.StopIntent": "END" },
    ...faqs.map(m => ({ [m.intent]: "FaqIntent" }))
  ),
  db: {
    FileDb: {
      pathToFile: "./../../db/db.json"
    }
  }
};

export = config;
