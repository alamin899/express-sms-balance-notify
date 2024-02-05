const express = require('express')
const app = express()
require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

const {readyPayload } = require('./Data/slackPayloadValue');
const { sendNotification } = require('./Services/slackNotificationService');
const { callApi } = require('./Services/externalApiCall');


const port = process.env.PORT || 3000;


// Define your scheduled task to run every minute
cron.schedule('*/1 * * * *', () => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
  const csmsIdsData = process.env.SSL_WIRELESS_CSMS_IDS;
  const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
  const apiUrl = process.env.SSL_API_ENDPOINT;

  const csmsIds = csmsIdsData.split(',');
  const notificationMessages = [];

  if (csmsIds.length > 0) {
    for (const id of csmsIds) {
      const payload = {api_token:apiToken,sid:id};
      console.log("--------",payload)
      try {
        const response = callApi(apiUrl, payload);
        notificationMessages.push({
          label:id,balance:response.balance
        })
      } catch (error) {
        console.error(`Error calling API for ID ${id}:`, error.message);
      }
    }

    console.log(notificationMessages);
    sendNotification(slackWebhookUrl, notificationMessages,readyPayload);
  }
});



app.get('/', (req, res) => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;

  sendNotification(slackWebhookUrl, "message",readyPayload);
   res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})