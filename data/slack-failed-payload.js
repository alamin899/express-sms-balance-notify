
const failedPayload = (data) => {
    
    const today = new Date();
    const formatedDate = today.toLocaleDateString('en-US', 
    { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Dhaka'
    });

   
    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Api call failed ${formatedDate}`
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Try again"
                        },
                        "style": "danger",
                        "value": data.url.toString()
                    }
                ]
            }
        ]
    };
}

module.exports = { failedPayload };