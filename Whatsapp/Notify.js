import 'dotenv/config.js';

import twilio from 'twilio';

const client = twilio(process.env.accountSid, process.env.authToken);

export default client;
