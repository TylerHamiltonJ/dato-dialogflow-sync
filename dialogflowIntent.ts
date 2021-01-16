// TODO fix ids

const createEntities = entities => {
  // TODO Maybe put @ at the end of type.
  return entities.map(m => {
    const data = {
      id: "e8e3996f-2d8f-4cfd-a5d3-6475a8ce7359",
      name: m.name,
      required: false,
      dataType: `@${m.name}`,
      value: `$${m.name}`,
      defaultValue: "",
      isList: false,
      prompts: [],
      promptMessages: [],
      noMatchPromptMessages: [],
      noInputPromptMessages: [],
      outputDialogContexts: []
    };
    return data;
  });
};

export const createIntent = (intentName, entities, priority, event?) => {
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
            condition: ""
          }
        ],
        speech: []
      }
    ],
    priority,
    webhookUsed: true,
    webhookForSlotFilling: false,
    fallbackIntent: false,
    events: event ? [{ name: event }] : [],
    conditionalResponses: [],
    condition: "",
    conditionalFollowupEvents: []
  };
  return data;
};

export const createUtterances = utteranceString => {
  const utteranceIntentTemplate = entity => {
    const value = entity.substring(1, entity.length - 1).split("|");
    return {
      text: value[1],
      meta: `@${value[0]}`,
      alias: value[0],
      userDefined: true
    };
  };

  const utteranceTemplate = utteranceArr => {
    return {
      id: "8f7f09a5-d5b6-41d2-85b1-51c782a11284",
      data: utteranceArr.map(utteranceComponent => {
        if (utteranceComponent.includes("{")) {
          return utteranceIntentTemplate(utteranceComponent);
        }
        return {
          text: utteranceComponent,
          userDefined: false
        };
      }),
      isTemplate: false,
      count: 0,
      lang: "en",
      updated: 0
    };
  };
  const utterances = utteranceString.split("\n");
  return utterances.map(utterance =>
    utteranceTemplate(utterance.split(/({.+})/g).filter(f => f.length > 0))
  );
};

export const createEntity = entities => {
  return entities.map(entity => {
    return {
      name: entity.name,
      entries: entity.value.map(m => ({
        value: m.key,
        synonyms: [...m.synonyms.split(", "), m.key]
      })),
      entity: {
        id: "ed11f670-5068-4f66-b31f-eb0dc5a04aea",
        name: entity.name,
        isOverridable: true,
        isEnum: false,
        isRegexp: false,
        automatedExpansion: false,
        allowFuzzyExtraction: false
      }
    };
  });
};

export const createAgentJSON = agent => {
  const defaultAgent = {
    description: agent.description,
    language: agent.language,
    shortDescription: agent.shortDescription,
    examples: agent.examples,
    linkToDocs: agent.linkToDocs,
    displayName: agent.displayName,
    disableInteractionLogs: agent.disableInteractionLogs,
    disableStackdriverLogs: agent.disableStackdriverLogs,
    defaultTimezone: agent.defaultTimezone,
    isPrivate: agent.isPrivate,
    mlMinConfidence: agent.mlMinConfidence,
    supportedLanguages: [],
    enableOnePlatformApi: agent.enableOnePlatformApi,
    onePlatformApiVersion: agent.onePlatformApiVersion,
    analyzeQueryTextSentiment: agent.analyzeQueryTextSentiment,
    enabledKnowledgeBaseNames: [],
    knowledgeServiceConfidenceAdjustment: 0.0,
    dialogBuilderMode: false,
    baseActionPackagesUrl: ""
  };
  return defaultAgent;
};
