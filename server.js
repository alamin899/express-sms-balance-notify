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
cron.schedule('*/1 * * * *', async () => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
  const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
  const apiUrl = process.env.SSL_API_ENDPOINT;

  const csmsIdsData = process.env.SSL_WIRELESS_CSMS_IDS;
  const csmsIds = csmsIdsData.split(',');
  const notificationMessages = [];

  if (csmsIds.length > 0) {
    for (const id of csmsIds) {
      const payload = {api_token:apiToken,sid:id};
      
      try {
        const response = await callApi(apiUrl, payload);
        notificationMessages.push(
          {
            label:id,
            balance:response.data.balance
          }
        )
      } catch (error) {
        console.error(`Error calling API for ID ${id}:`, error.message);
      }
    }

    if(notificationMessages.length>0){
      sendNotification(slackWebhookUrl, notificationMessages,readyPayload);
    }
  }
});



app.get('/',async (req, res) => {
  res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})