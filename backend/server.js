const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.json());
app.use(cors());
const jwt = require('./utils/Jwt')
const http = require("http");
const socketIo = require("socket.io");
const Twilio = require('./Twilio'); // Assuming Twilio.js is in the same directory

const server = http.createServer(app);
const io = socketIo(server); // Change variable name to io for clarity

io.on('connection', (socket) =>{
  console.log('Socket connected: ',  socket.id);
  socket.on('disconnect', () => {
    console.log(`Client disconnected:`, socket.id);
});
});



const twilioInstance = new Twilio(); // Create an instance of the Twilio class

//Login route
app.post('/login', async (req, res) => {
  console.log("Verification Sent ");
  const {to, username, channel} = req.body;
  try {
    const data = await twilioInstance.sendVerifyAsync(to, channel);
    res.send('sent code');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error sending verification');
  }
});

//Verify Route
app.post('/verify', async (req, res)=>{
  try {
    console.log("verification on process: ")
    const {to, code, username} = req.body;
    const data = await twilioInstance.verifyCodeAsync(to, code);
    if(data.status === 'approved'){
      const token = jwt.createJwt(username)
      return res.send({token});
    }
    res.status(401).send('Invalid OTP');
  } catch (error) {
    console.error(error.message);
    return res.status(400).send({"error": "Invalid request."})
  }
});

//test route
app.get("/test",  (req,res) => {
  res.json({ message : "It works!" })
})

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send("Welcome to Hydra Dialer of Hydra Global Empire!");
});
