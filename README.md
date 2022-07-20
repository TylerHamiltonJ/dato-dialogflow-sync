# Dato Dialogflow Sync - WIP

Dialogflow is one of the best NLP tools that's available to us cowboy developers. However, it can be difficult to manage many intents and utterances within the tool - especially if you're wanting content editors to manage things too.

Dato Dialogflow Sync is your solution to housing your intents, entities, training phrases and even responses within a lightweight CMS, whilst still preserving the power NLP of Dialogflow.

## Installation

## Quick Start

To use the Jovo Templates, you'll need the Jovo CLI. You can install it globally with NPM.

```sh
$ npm install -g jovo-cli
```

After successfully installing the Jovo CLI, you can install the template using one of the following commands:

```sh
$ jovo new <directory> --language typescript

## Alternative
$ jovo new <directory> --template helloworld --language typescript
```

> Read more about `jovo new` [here](https://www.jovo.tech/marketplace/jovo-cli#jovo-new).

Change your working directory into your newly created project directory and run your voice app:

```sh
# Change working directory to your previously specified directory.
$ cd <directory>

# Install dependencies.
$ npm install

# Run voice app, optionally with a --watch flag to restart on code changes.
$ jovo run [-w]
```

> Read more about `jovo run` [here](https://www.jovo.tech/marketplace/jovo-cli#jovo-run).

If you now go to the [Jovo Debugger](https://www.jovo.tech/marketplace/jovo-plugin-debugger) by pressing `.` or clicking on the webhook url in the terminal, you can test your voice application right away.

![Debugger Example](./img/debugger.gif)

