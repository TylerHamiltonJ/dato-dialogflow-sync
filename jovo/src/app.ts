import { App } from "jovo-framework";
import { JovoDebugger } from "jovo-plugin-debugger";
import { FileDb } from "jovo-db-filedb";
import { Dialogflow } from "jovo-platform-dialogflow";
import * as faqs from "./faqs.json";
import * as responses from "./responses.json";

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(new Dialogflow(), new JovoDebugger(), new FileDb());

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  // LaunchIntent() {
  //   return this.toIntent("HelloWorldIntent");
  // },

  HelloWorldIntent() {
    this.ask(["Hello World! What's your name?", "Please tell me your name."]);
  },

  MyNameIsIntent() {
    this.tell("Hey " + this.$inputs.name.value + ", nice to meet you!");
  },
  FaqIntent() {
    const intent = this.$request?.getIntentName();
    const response = faqs.find(f => f.intent === intent)?.response;
    this.tell(response || "No response found");
  }
});

export { app };
