const {readyPayload } = require('../data/slack-payload-value');
const {failedPayload } = require('../data/slack-failed-payload');
const { sendNotification } = require('../services/slack-notification-service');
const { callApi } = require('../services/external-api-call');

const smsBalanceSlackNotifyOperation = async (returnOnlyData=false) => {
    const slackWebhookUrl = process.env.SLACK_WEB_HOOK_URL;
    const apiToken = process.env.SSL_WIRELESS_API_TOKEN;
    const retryUrl = process.env.RETRY_URL;
    const apiUrl = "https://smsplus.sslwireless.com/api/v3/balance";
  
    const csmsIdsData = process.env.SSL_WIRELESS_CSMS_IDS;
    const csmsIds = csmsIdsData.split(',');
    const notificationMessages = [];
  
    if (csmsIds.length > 0) {
      const MAX_RETRY_COUNT = 3;

for (const id of csmsIds) {
    let retryCount = 0;
    
    while (retryCount < MAX_RETRY_COUNT) {
        const payload = { api_token: apiToken, sid: id };
        
        try {
            const response = await callApi(apiUrl, payload);
           
            if(response.data.status_code == 200){
                notificationMessages.push({
                  label: id,
                  balance: response.data.balance
              });
              break;
            }
            else {
              throw new Error(`API call for ID ${id} returned status code ${response.data.status_code}`);
          }
            
        }
         catch (error) {
            console.error(`Error calling API for ID ${id}:`, error.message);
            retryCount++;
            
            if (retryCount === MAX_RETRY_COUNT) {
              sendNotification(slackWebhookUrl, {url:retryUrl},failedPayload);
            } else {
                console.log(`Retrying API call for ID ${id}...`)
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }
}
      if(returnOnlyData){
        return {'balance': notificationMessages};
      }
  
      if(notificationMessages.length>0){
        sendNotification(slackWebhookUrl, notificationMessages,readyPayload);
      }
    }
};

module.exports = { smsBalanceSlackNotifyOperation };