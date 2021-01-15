// TODO fix ids

const createEntities = (entities) => {
  // TODO Maybe put @ at the end of type.
  return entities.map((m) => {
    const data = {
      id: "e8e3996f-2d8f-4cfd-a5d3-6475a8ce7359",
      name: m.name,
      required: false,
      dataType: m.type,
      value: `$${m.name}`,
      defaultValue: "",
      isList: false,
      prompts: [],
      promptMessages: [],
      noMatchPromptMessages: [],
      noInputPromptMessages: [],
      outputDialogContexts: [],
    };
    return data;
  });
};

const createIntent = (intentName, entities) => {
  const data = {
    id: "e84a79e5-30d7-445d-8483-5ed3e236c3e6",
    name: intentName,
    auto: true,
    contexts: [],
    responses: [
      {
        resetContexts: false,
        action: intentName,
        affectedContexts: [],
        parameters: entities ? createEntities(entities) : [],
        messages: [
          {
            type: "0",
            title: "Erorr with the endpoint.",
            textToSpeech: "",
            lang: "en",
            condition: "",
          },
        ],
        speech: [],
      },
    ],
    priority: 500000,
    webhookUsed: true,
    webhookForSlotFilling: false,
    fallbackIntent: false,
    events: [],
    conditionalResponses: [],
    condition: "",
    conditionalFollowupEvents: [],
  };
  return data;
};
module.exports.createIntent = createIntent;
