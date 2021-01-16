// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------
import * as faqs from "./jovo/src/faqs.json";

const config = {
  logging: true,
  intentMap: Object.assign({ "AMAZON.StopIntent": "END" }, ...faqs.map(m => ({ [m.intent]: "FaqIntent" })))
};

console.log(config);
