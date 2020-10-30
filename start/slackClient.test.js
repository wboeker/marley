const dotenv = require("dotenv");

const { SlackClient } = require("./slackClient.js");

dotenv.config();
const BASE_SLACK_URL = "https://slack.com";
const BOT_TOKEN = process.env.BOT_TOKEN;

describe("Integration tests for slack client", () => {
  it("SlackClient has a fetchUser method", async () => {
    const client = new SlackClient(BOT_TOKEN, BASE_SLACK_URL);
    const userData = await client.fetchUser("U0191680A49").catch((error) => {
      console.log(error);
    });
    expect(userData.profile.email).toEqual("wendyboeker@khanacademy.org");
  });

  it("SlackClient has a fetchUser method", async () => {
    const client = new SlackClient(BOT_TOKEN, BASE_SLACK_URL);
    const userData = await client.fetchUser("U0191680A49").catch((error) => {
      console.log(error);
    });
    expect(userData.profile.email).toEqual("wendyboeker@khanacademy.org");
  });
});
