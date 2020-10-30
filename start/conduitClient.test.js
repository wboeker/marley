const dotenv = require("dotenv");

const { ConduitClient } = require("./conduitClient.js");
const { SlackClient } = require("./slackClient.js");

dotenv.config();
const BASE_PHABRICATOR_URL = "https://phabricator.khanacademy.org";
const CONDUIT_TOKEN = process.env.CONDUIT_TOKEN;
const BASE_SLACK_URL = "https://slack.com";
const BOT_TOKEN = process.env.BOT_TOKEN;

describe("Integration tests for conduit client", () => {
  const slackClient = new SlackClient(BOT_TOKEN, BASE_SLACK_URL);
  const client = new ConduitClient(
    CONDUIT_TOKEN,
    BASE_PHABRICATOR_URL,
    slackClient
  );

  it("has a fetchUser method", async () => {
    const userData = await client.fetchUser("wendyboeker").catch((error) => {
      console.log(error);
    });
    expect(userData).toEqual([
      {
        attachments: {},
        fields: {
          "custom.khan:github-username": null,
          "custom.khan:hipchat-username": null,
          dateCreated: 1598396911,
          dateModified: 1598397248,
          policy: { edit: "no-one", view: "public" },
          realName: "Wendy Boeker",
          roles: ["verified", "approved", "activated"],
          username: "wendyboeker",
        },
        id: 502,
        phid: "PHID-USER-kqrp2sxw4wfsi4qdb4sh",
        type: "USER",
      },
    ]);
  });

  it("has a fetchDiffs method", async () => {
    const userData = await client.fetchUser("wendyboeker").catch((error) => {
      console.log(error);
    });
    const diffsData = await client
      .fetchDiffs(userData[0].phid)
      .catch((error) => {
        console.log(error);
      });
    expect(diffsData.length).toBeGreaterThan(1);
  });

  it("can fetchDiff from a month or more ago given a phabricator username", async () => {
    const diffObj = await client
      .getMonthAgoDiff("wendyboeker")
      .catch((error) => {
        console.log(error);
      });
    expect(diffObj).toHaveProperty("phabricatorUrl");
    expect(diffObj).toHaveProperty("summary");
    expect(diffObj).toHaveProperty("title");
    expect(diffObj.phabricatorUrl).toContain(
      "https://phabricator.khanacademy.org/"
    );
  });

  it("can getMonthAgoDiffMessage given a phabricator username", async () => {
    const diffMessage = await client
      .getMonthAgoDiffMessage("wendyboeker", "month")
      .catch((error) => {
        console.log(error);
      });
    console.log(diffMessage);
    expect(diffMessage).toContain("https://phabricator.khanacademy.org/");
  });
});
