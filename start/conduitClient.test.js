const { ConduitClient } = require("./conduitClient.js");

const BASE_PHABRICATOR_URL = "https://phabricator.khanacademy.org";
const API_TOKEN = "your-token-here";

it("ConduitClient has a fetchUser method", async () => {
  const client = new ConduitClient(API_TOKEN, BASE_PHABRICATOR_URL);
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

it("ConduitClient has a fetchDiffs method", async () => {
  const client = new ConduitClient(API_TOKEN, BASE_PHABRICATOR_URL);
  const userData = await client.fetchUser("wendyboeker").catch((error) => {
    console.log(error);
  });
  const diffsData = await client.fetchDiffs(userData[0].phid).catch((error) => {
    console.log(error);
  });
  console.log(diffsData);
});