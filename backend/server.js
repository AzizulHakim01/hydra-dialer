const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.json())
app.use(cors())

const Twilio = require('./Twilio'); // Assuming Twilio.js is in the same directory

const twilioInstance = new Twilio(); // Create an instance of the Twilio class

//Login route
app.post('/login', async (req, res) => {
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
app.post('/verify', async (req, res)=>{
  try {
    console.log("verification on process: ")
    const {to, code} = req.body;
    const data = await twilioInstance.verifyCodeAsync(to, code);
    res.send(data);
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
