const bent = require("bent");
const formurlencoded = require("form-urlencoded").default;

// A way to access the Phabricator API
class ConduitClient {
  constructor(apiToken, basePhabricatorUrl) {
    this.apiToken = apiToken;
    this.basePhabricatorUrl = basePhabricatorUrl;
  }

  async fetchUser(username) {
    const get = bent(this.basePhabricatorUrl, "GET", 200);
    const headers = {
      "api.token": this.apiToken,
      constraints: {
        usernames: [username],
      },
    };

    const response = await get("/api/user.search", formurlencoded(headers));
    const jsonResponse = await response.json();
    return jsonResponse.result.data;
  }

  async fetchDiffs(authorPHID) {
    const get = bent(this.basePhabricatorUrl, "GET", 200);
    const headers = {
      "api.token": this.apiToken,
      constraints: {
        authorPHIDs: [authorPHID],
      },
    };

    const response = await get("/api/differential.revision.search", formurlencoded(headers));
    const jsonResponse = await response.json();
    return jsonResponse.result.data;
  }
}

module.exports = { ConduitClient };
