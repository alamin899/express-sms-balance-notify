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
  const csmsIdsData = process.env.SSL_WIRELESS_CSMS_IDS;
  const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
  const apiUrl = process.env.SSL_API_ENDPOINT;

  const csmsIds = csmsIdsData.split(',');
  const notificationMessages = [];

  // const payload = {api_token:apiToken,sid:csmsIds[0]};

  //       const response =await callApi(apiUrl, payload);
  //       console.log(response.data);
  //       sendNotification(slackWebhookUrl, {message:response.data.sid,phone:response.data.balance},readyPayload);
  if (csmsIds.length > 0) {
    for (const id of csmsIds) {
      const payload = {api_token:apiToken,sid:id};
      console.log("--------",payload)
      try {
        const response = await callApi(apiUrl, payload);
        notificationMessages.push({
          label:id,balance:response.data.balance
        })
      } catch (error) {
        console.error(`Error calling API for ID ${id}:`, error.message);
      }
    }

    console.log(notificationMessages);
    sendNotification(slackWebhookUrl, notificationMessages,readyPayload);
  }
});



app.get('/',async (req, res) => {
  const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
  const csmsIdsData = process.env.SSL_WIRELESS_CSMS_IDS;
  const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
  const apiUrl = process.env.SSL_API_ENDPOINT;

  const csmsIds = csmsIdsData.split(',');
  const notificationMessages = [];

  // const payload = {api_token:apiToken,sid:csmsIds[0]};

  //       const response =await callApi(apiUrl, payload);
  //       console.log(response.data);
  //       sendNotification(slackWebhookUrl, {message:response.data.sid,phone:response.data.balance},readyPayload);
  if (csmsIds.length > 0) {
    for (const id of csmsIds) {
      const payload = {api_token:apiToken,sid:id};
      console.log("--------",payload)
      try {
        const response =await callApi(apiUrl, payload);
        notificationMessages.push({
          label:id,balance:response.data.balance
        })
      } catch (error) {
        console.error(`Error calling API for ID ${id}:`, error.message);
      }
    }

    console.log(notificationMessages);
    sendNotification(slackWebhookUrl, notificationMessages,readyPayload);
  }
  res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})