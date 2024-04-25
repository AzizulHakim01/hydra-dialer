const twilio = require("twilio");

class Twilio {
  PhoneNumber = process.env.PhoneNumber;
  phoneNumberSid = process.env.phoneNumberSid;
  tokenSid = process.env.tokenSid;
  tokenSecret = process.env.tokenSecret;
  accountSid = process.env.accountSid;
  verify = process.env.verify;
  client;
  
  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, { accountSid: this.accountSid });
  }
  
  async sendVerifyAsync(to, channel) {
    try {
      const data = await this.client.verify.v2.services(this.verify).verifications.create({
        to,
        channel,
      });
      console.log('Verification result:', data);
      return data;
    } catch (error) {
      console.error('Error sending verification:', error);
      throw error;
    }
  }
}



module.exports = Twilio;
