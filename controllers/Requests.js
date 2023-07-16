import mongoose from 'mongoose';

import requests from '../models/Requests.js';
import provider from '../models/Provider.js';
import requester from '../models/Requester.js';
import client from '../Whatsapp/Notify.js';

export const getRequests = async (req, res) => {
    try {
        const Requests = await requests.find().populate('requester registrants');
        res.status(200).json(Requests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRequestById = async (req, res) => {
    const{id:_id}=req.params;
    try {
        const Request = await requests.findById(_id).populate('requester registrants');
        res.status(200).json([Request]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRequests = async (req, res) => {
    const newRequest = new requests(req.body);

    try {
        await newRequest.save();

        const categ = newRequest.category;
        const _id = newRequest.requester;
        const reqRaiser = await requester.findById(_id)

        provider.find({ categories: categ }, 'name phone', function (err, providers) {
            if (!err) {
                providers.map(provider => {
                    // Need to send the request to eligible providers registered. Not yet setup.
                    registerReq(provider.name, provider.phone, categ, reqRaiser.name, reqRaiser.location);
                });
            }
            else console.log(err);
        });

        res.status(201).json({
            message: 'Successfully Raised a request. Everyone who satisfies the criterion have been notified.',
            request: newRequest
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const registerReq = function registerReq(name, number, category, req_name, req_location) {
    // Need to build the url with add registrant here    
    client.messages
    .create({
        body: `Hi ${name}, 
                   \n\tThere is a request raised by *${req_name}* for:
                   \n\t\t *${category}*,
                   \n\t\t location: *${req_location}*. 
                   \n\tRegister yourself here to help!`,
        from: 'whatsapp:' + process.env.from,
        to: 'whatsapp:+1' + number
    })
    .then(message => console.log(message.sid))
    .done();
}


export const addRegistrant = async (req, res) => {
    const { id: _id } = req.params;
    const reg = req.body.registrant;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Requests with that id');

        let updatedRequest;
        const update = await requests.findOneAndUpdate(
            { _id: _id },
            { $push: { registrants: reg } },
            {new: true},
            (error, success) => {
                updatedRequest = success;
                console.log(success);
            }
        ).where('registrants').nin(reg);

        res.status(201).json({ message: 'Yes', updatedRequest: updatedRequest });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
