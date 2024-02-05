const express = require('express')
const app = express()
require('dotenv').config();

const axios = require('axios');
const {readyPayload } = require('./Data/slackPayloadValue');

const cron = require('node-cron');


const { sendNotification } = require('./Services/slackNotificationService');

const port = process.env.PORT || 3000;


// Define your scheduled task to run every minute
cron.schedule('*/1 * * * *', () => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;

  sendNotification(slackWebhookUrl, "message",readyPayload);
});

app.get('/', (req, res) => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;

  sendNotification(slackWebhookUrl, "message",readyPayload);
   res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})