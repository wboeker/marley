const { Botkit } = require("botkit");
const {
  SlackAdapter,
  SlackEventMiddleware,
} = require("botbuilder-adapter-slack");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const { ConduitClient } = require("./conduitClient.js");
const { SlackClient } = require("./slackClient.js");
const { messageTemplate } = require("./message.js");
const BASE_PHABRICATOR_URL = "https://phabricator.khanacademy.org";
const BASE_SLACK_URL = "https://slack.com";

/**
 * Returns the secret string from Google Cloud Secret Manager
 * @param {string} name The name of the secret.
 * @return {string} The string value of the secret.
 */
async function accessSecretVersion(name, versionNumber) {
  const client = new SecretManagerServiceClient();
  const projectId = process.env.PROJECT_ID;
  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${name}/versions/${versionNumber}`,
  });
  // Extract the payload as a string.
  const payload = version.payload.data.toString("utf8");

  return payload;
}

/**
 * Asynchronous function to initialize marleybot.
 */
async function marleybotInit() {
  const botToken = await accessSecretVersion("bot-token", "2");
  const adapter = new SlackAdapter({
    clientSigningSecret: await accessSecretVersion(
      "client-signing-secret",
      "1"
    ),
    botToken: botToken,
  });

  adapter.use(new SlackEventMiddleware());

  const controller = new Botkit({
    webhook_uri: "/api/messages",
    adapter: adapter,
  });
  const slackClient = new SlackClient(botToken, BASE_SLACK_URL);
  const conduitAPIToken = await accessSecretVersion("conduit-api-token", "1");
  const conduitClient = new ConduitClient(
    conduitAPIToken,
    BASE_PHABRICATOR_URL
  );

  controller.ready(() => {
    controller.hears(
      ["hello", "hi"],
      ["message", "direct_message"],
      async (bot, message) => {
        if (message.bot_id != message.user) {
          const emailName = await slackClient
            .fetchEmailName(message.user)
            .catch((error) => {
              console.log(error);
            });
          await bot.reply(message, `What's up, ${emailName}?`);
        }
      }
    );
    controller.hears(
      ["memories"],
      ["message", "direct_message"],
      async (bot, message) => {
        if (message.bot_id != message.user) {
          const emailName = await slackClient
            .fetchEmailName(message.user)
            .catch((error) => {
              console.log(error);
            });
          const diff = await conduitClient.getMonthAgoDiffMessage(
            emailName,
            "month"
          );
          await bot.reply(message, messageTemplate);
        }
      }
    );
  });
}

marleybotInit();
