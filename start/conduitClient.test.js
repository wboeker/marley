const dotenv = require("dotenv");

const { ConduitClient } = require("./conduitClient.js");

dotenv.config();
const BASE_PHABRICATOR_URL = "https://phabricator.khanacademy.org";
const CONDUIT_TOKEN = process.env.CONDUIT_TOKEN;

describe("Integration tests for conduit client", () => {
  it("has a fetchUser method", async () => {
    const client = new ConduitClient(CONDUIT_TOKEN, BASE_PHABRICATOR_URL);
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
    const client = new ConduitClient(CONDUIT_TOKEN, BASE_PHABRICATOR_URL);
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

  it("can fetchDiff from a month or more ago", async () => {
    const client = new ConduitClient(CONDUIT_TOKEN, BASE_PHABRICATOR_URL);
    const diffUrl = await client
      .getMonthAgoDiffUrl("wendyboeker")
      .catch((error) => {
        console.log(error);
      });
    expect(diffUrl).toContain("https://phabricator.khanacademy.org/");
  });
});
