const messageTemplate = (diffUrl, diffTitle, diffSummary) => {
  return {
    blocks: [
      {
        type: "divider",
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":spiral_calendar_pad:  A Month Ago  :spiral_calendar_pad:",
        },
      },
      {
        type: "context",
        elements: [
          {
            text: "*September 23, 2020*",
            type: "mrkdwn",
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: diffSummary,
          verbatim: false,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: diffTitle,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "See Your Memories",
            emoji: true,
          },
          value: "phabricator_link",
          url: diffUrl,
          action_id: "button-action",
        },
      },
      {
        type: "divider",
      },
    ],
  };
};

module.exports = {
  messageTemplate,
};
