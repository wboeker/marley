const { SlackClient } = require("./slackClient.js");

const BASE_SLACK_URL = "https://slack.com";
const API_TOKEN = "xoxb-2322548031-1458006913299-5wnyzWz7GFSBUt7nR5i5twYc";

it("SlackClient has a fetchUser method", async () => {
  const client = new SlackClient(API_TOKEN, BASE_SLACK_URL);
  const userData = await client.fetchUser("U0191680A49").catch((error) => {
    console.log(error);
  });
  console.log(userData);
});