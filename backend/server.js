const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies

const Twilio = require('./Twilio'); // Assuming Twilio.js is in the same directory

const twilioInstance = new Twilio(); // Create an instance of the Twilio class

//Login route
app.get('/login', async (req, res) => {
  console.log("Verification Sent ");
  const {to, username, channel} = req.body;
  try {
    const data = await twilioInstance.sendVerifyAsync(to, channel);
    res.send(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error sending verification');
  }
});

//Verify Route
app.get('/verify', async (req, res)=>{
  try {
    console.log("verification on process: ")
    const data = await twilioInstance.verifyCodeAsync(process.env.MOBILE, req.query.code);
    return data;
  } catch (error) {
    console.error(error.message);
    return res.status(400).send({"error": "Invalid request."})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send("Welcome to Hydra Dialer of Hydra Global Empire!");
});
