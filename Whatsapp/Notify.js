import 'dotenv/config.js';

import twilio from 'twilio';

const client = twilio(process.env.accountSid, process.env.authToken);

export const registerReq = function registerReq(name, number, category, req_name, req_location) {

    console.log
    (
        `Hi ${name},There is a request raised by *${req_name}* for: *${category}*, location: *${req_location}*.Register yourself here to help!`);
                /*
    client.messages
        .create({
            body: `Hi ${name}, 
                       \n\tThere is a request raised by *${req_name}* for:
                       \n\t\t *${category}*,
                       \n\t\t location: *${req_location}*. 
                       \n\tRegister yourself here to help!`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+91' + number
        })
        .then(message => console.log(message.sid))
        .done();
        */
}

export default client;
