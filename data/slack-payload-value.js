
const readyPayload = (data) => {
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', 
    { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Dhaka'
    });

   
    var blocks = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `SMS Balance Update (${formattedDate})`,
                "emoji": true
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": "*SID*"
                },
                {
                    "type": "mrkdwn",
                    "text": "*Balance*"
                }
            ]
        },
        {
            "type": "divider"
        },
    ];
    
    for (let i = 0; i < data.length; i++) {
        blocks.push(
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": data[i].label.toString(),
                    },
                    {
                        "type": "mrkdwn",
                        "text": data[i].balance.toString(),
                    }
                ]
            },
            {
                "type": "divider"
            }
        );
    }
   
    return {
        "blocks": blocks
    };
}

module.exports = { readyPayload };