const express = require('express')
const app = express()
require('dotenv').config();
const cron = require('node-cron');
const { smsBalanceSlackNotifyOperation } = require('./operations/sms-balance-slack-notify-operation');




const port = process.env.PORT || 3000;


// Run every morning 07:00 AM
cron.schedule('0 7 * * *',async () => {
  await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
});

// Run every morning 07:00 PM
cron.schedule('0 19 * * *',async () => {
  await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
});


app.get('/notify',async (req, res) => {
  await smsBalanceSlackNotifyOperation();
  res.send(`Successfully notification send to your slack channe!`);
})

app.get('/',async (req, res) => {
  res.send(`Landing pages`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})