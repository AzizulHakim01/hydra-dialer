const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies

const Twilio = require('./Twilio'); // Assuming Twilio.js is in the same directory

const twilioInstance = new Twilio(); // Create an instance of the Twilio class

app.get('/login', async (req, res) => {
  console.log("Logging In ");
  try {
    const data = await twilioInstance.sendVerifyAsync(process.env.MOBILE, 'sms');
    res.send(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error sending verification');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send("Welcome to Hydra Dialer of Hydra Global Empire!");
});
