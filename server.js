const express = require('express')
const app = express()
require('dotenv').config();
const cron = require('node-cron');
const { smsBalanceSlackNotifyOperation } = require('./operations/sms-balance-slack-notify-operation');




const port = process.env.PORT || 3000;


// Define your scheduled task to run every minute
cron.schedule('*/5 * * * *',async () => {
  await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
});


app.get('/notify',async (req, res) => {
  await smsBalanceSlackNotifyOperation();
  res.send(`Successfully notified!`);
})

app.get('/',async (req, res) => {
  res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})