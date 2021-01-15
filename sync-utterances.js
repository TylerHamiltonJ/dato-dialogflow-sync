//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const { createIntent } = require("./dialogflowIntent");
//joining path of directory

const projectName = "datocms-template-alll";
const directoryPath = path.join(__dirname, `${projectName}/intents`);

fs.readdir(directoryPath, async function (err, files) {
  const utteranceFiles = files.filter((f) => f.includes("_usersays_en"));
  const interactionModel = utteranceFiles.map((file) => {
    const data = JSON.parse(
      fs.readFileSync(`${directoryPath}/${file}`).toString()
    );
    const utterances = data.map((m) =>
      m.data
        .map((o) => {
          if (o.alias) {
            return `{${o.alias}|${o.text}}`;
          }
          return o.text;
        })
        .join("")
    );

    return {
      utterances,
      intent: file,
    };
  });
  //   console.log(interactionModel);
});
