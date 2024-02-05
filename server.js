const express = require('express')
const app = express()
require('dotenv').config();

const { sendNotification } = require('./Notifications/slackNotificationService');

const port = process.env.PORT || 3000;



/**===============Scheduler run =============================================== */
// subscriber.on('message', (channel, message) => {
//   if(channel === smsSendChannel){
//     let data = JSON.parse(message);
//     let phone = data && data.phone  ? data.phone : "01700000000";
//     let sms = data && data.message ? data.message : "Test message";

//     if(process.env.SMS_SEND){
//       sendSslMessage(phone,sms);
//     }
//   }

//   if(channel === slackNotificationChannel){
//     const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
//     sendNotification(slackWebhookUrl, JSON.parse(message));
//   }
// });
/**===================================================================== */


app.get('/', (req, res) => {
   res.send(`Landing page`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})