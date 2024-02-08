const express = require('express')
const app = express()
require('dotenv').config();
const cron = require('node-cron');
const { smsBalanceSlackNotifyOperation } = require('./operations/sms-balance-slack-notify-operation');




const port = process.env.PORT || 3000;


// Run every morning 07:00 AM
cron.schedule('1 * * * *',async () => {
  await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
},{
  timezone: 'Asia/Dhaka'
});

// Run every morning 07:00 PM
cron.schedule('20 14 * * *',async () => {
  await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
},{
  timezone: 'Asia/Dhaka'
});


app.get('/notify',async (req, res) => {
  await smsBalanceSlackNotifyOperation();
  res.send(`Successfully notification send to your slack channe!`);
})

app.get('/',async (req, res) => {
  res.send(`Landing page!`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})