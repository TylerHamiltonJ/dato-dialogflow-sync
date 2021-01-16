import { getIntent } from "./dato-cms";
import { createIntent, createUtterances, createEntity, createAgentJSON } from "./dialogflowIntent";
import * as fs from "fs";

getIntent().then(async res => {
  const intentObj = res.allIntents.map(intent => ({
    intentName: intent.intentName,
    utterances: createUtterances(intent.utterance),
    intent: createIntent(intent.intentName, intent.entities, intent.priority, intent.event)
  }));
  const faqs = res.allFaqs.map(m => ({
    intent: m.intent.intentName,
    response: m.response.pathname.pathName
  }));
  const responses = res.allResponses.map(m => ({
    [m.pathname.pathName]: m.response.map(n => n.textResponse)
  }));
  fs.writeFileSync(`./jovo/src/responses.json`, JSON.stringify(responses, null, 2));
  fs.writeFileSync(`./jovo/src/faqs.json`, JSON.stringify(faqs, null, 2));
  await [
    fs.mkdirSync("./output"),
    fs.mkdirSync("./output/intents"),
    fs.mkdirSync("./output/entities")
  ];
  const entitiesObj = createEntity(res.allEntities);
  intentObj.forEach(e => {
    fs.writeFileSync(`./output/intents/${e.intentName}.json`, JSON.stringify(e.intent, null, 2));
    fs.writeFileSync(
      `./output/intents/${e.intentName}_usersays_en.json`,
      JSON.stringify(e.utterances, null, 2)
    );
  });
  entitiesObj.forEach(e => {
    console.log(e);
    fs.writeFileSync(`./output/entities/${e.name}.json`, JSON.stringify(e.entity, null, 2));
    fs.writeFileSync(
      `./output/entities/${e.name}_entries_en.json`,
      JSON.stringify(e.entries, null, 2)
    );
  });
  fs.writeFileSync(`./output/agent.json`, JSON.stringify(createAgentJSON(res.agent), null, 2));
  fs.writeFileSync(`./output/package.json`, JSON.stringify({ version: "1.0.0" }, null, 2));
});
