const axios = require('axios');

const sendNotification = async (webhookUrl, message, payloadFunction) => {
  var payload = payloadFunction(message);
  try {
    const response = await axios.post(webhookUrl, payload);
    return 'Notification sent successfully';
  } catch (error) {
        throw new Error('Error sending notification');
  }
};

module.exports = { sendNotification };