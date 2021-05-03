import mongoose from 'mongoose';

import requester from '../models/Requester.js'
import client from '../Whatsapp/Notify.js';

export const getRequesters = async (req, res) => {
    try {
        const Requesters = await requester.find();
        res.status(200).json(Requesters);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getaRequester = async (req, res) => {
    const { id: _id } = req.params;
    try{
        const Requester = await requester.findById(_id);
        res.status(203).json(Requester);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const createRequester = async (req, res) => {
    const newRequester = new requester(req.body);
    try {
        await newRequester.save();
        res.status(201).json(newRequester);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRequester = async (req, res) => {
    const { id: _id } = req.params;
    const Requester = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Requester with that id');

    const updatedRequester = await requester.findByIdAndUpdate(_id, { ...Requester, _id }, { new: true });

    res.status(201).json(updatedRequester);
}