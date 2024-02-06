const {readyPayload } = require('./data/slack-payload-value');
const { sendNotification } = require('./services/slack-notification-service');
const { callApi } = require('./services/external-api-call');

const smsBalanceSlackNotifyOperation = async () => {
    const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
    const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
    const apiUrl = "https://smsplus.sslwireless.com/api/v3/balance";
  
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
};

module.exports = { smsBalanceSlackNotifyOperation };