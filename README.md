# "Marley", a Slack Bot with Node.js on Cloud Run

This repository contains the code for Marley, a slackbot that notifies slack users of their PRs of the past, named after Jacob Marley, the ghost of Christmas past. The inital version was created by following the [Build a Slack Bot with Node.js on Cloud Run Google codelab][cloud-slack-bot-codelab] tutorial.

Marley was created for the Khan Academy Hackathon in November 2020.

## Testing

To run integration tests pulling data from phabricator in `conduitClient.test.js` create a `.env` file in the `start` directory with your Phabricator api token:

```
API_TOKEN=your-phabricator-api-token
```

## License

Apache Version 2.0

See [LICENSE](LICENSE).
