import mongoose from 'mongoose';

import requests from '../models/Requests.js'
import provider from '../models/Provider.js'
import requester from '../models/Requester.js'
import { registerReq } from '../Whatsapp/Notify.js'

export const getRequests = async (req, res) => {
    try {
        const Requests = await requests.find().populate('requester registrants');
        res.status(200).json(Requests);
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


export const addRegistrant = async (req, res) => {
    const { id: _id } = req.params;
    const reg = req.body.registrant;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Requests with that id');

        var updatedRequest;
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
