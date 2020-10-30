const bent = require("bent");

/**
 * A client for accessing the Slack API.
 */
class SlackClient {
  constructor(apiToken, baseSlackUrl) {
    this.apiToken = apiToken;
    this.baseSlackUrl = baseSlackUrl;
  }

  async fetchUser(userID) {
    const get = bent(this.baseSlackUrl, "GET", 200);
    const response = await get(
      "/api/users.profile.get?token=" + this.apiToken + "&user=" + userID
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  async fetchEmailName(userId) {
    const userData = await this.fetchUser(userId).catch((error) => {
      console.log(error);
    });
    let emailName = userData.profile.email.split("@")[0];
    if (emailName == "alexvolpert") {
      emailName = "volpert";
    }
    return emailName;
  }
}

module.exports = { SlackClient };
