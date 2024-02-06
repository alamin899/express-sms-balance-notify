const axios = require('axios');

const callApi = async (url,payload) => {
  try {
    const response = await axios.post(url, payload);
   return response;
  } catch (error) {
        throw new Error('Error sending notification');
  }
};

module.exports = { callApi };