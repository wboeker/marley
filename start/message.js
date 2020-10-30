const messageTemplate = {
    "blocks": [
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": ":spiral_calendar_pad:  A Month Ago  :spiral_calendar_pad:"
            }
        },
        {
            "type": "context",
            "elements": [
                {
                    "text": "*September 23, 2020*",
                    "type": "mrkdwn"
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "_So, the thought was that adding a subject_id (course_id) resolver would look up the current subject_id based on the subject slug at the time when the assignment was added. So if the subject_slug is updated to point to a different course or the name is changed, the specific url can still be found by matching on the immutable subject_id..._",
                "verbatim": false
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Migrate the stage Task field to Go*"
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "See Your Memories",
                    "emoji": true
                },
                "value": "phabricator_link",
                "url": "https://phabricator.khanacademy.org/D66320",
                "action_id": "button-action"
            }
        },
        {
            "type": "divider"
        }
    ]
};

module.exports = {
    messageTemplate,
};