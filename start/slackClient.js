const bent = require("bent");

// A way to access the Slack API
class SlackClient {
  constructor(apiToken, baseSlackUrl) {
    this.apiToken = apiToken;
    this.baseSlackUrl = baseSlackUrl;
  }

  async fetchUser(userID) {
    console.log("USER ID IN FETCH USER", userID);
    const get = bent(this.baseSlackUrl, "GET", 200);
    const response = await get("/api/users.profile.get?token=" + this.apiToken + "&user=" + userID);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
}

module.exports = { SlackClient };
