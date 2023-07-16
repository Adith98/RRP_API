import mongoose from 'mongoose';

import provider from '../models/Provider.js'
import client from '../Whatsapp/Notify.js';

export const getProviders = async (req, res) => {
    try {
        const Providers = await provider.find();

        res.status(200).json(Providers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProvider = async (req, res) => {
    const Provider = req.body;
    const newProvider = new provider(Provider);
    try {
        await newProvider.save();
        res.status(201).json(newProvider);
        client.messages
            .create({
                body: `Hi ${newProvider.name}, You have successfully registered yourself. Thank you!`,
                from: 'whatsapp:' + process.env.from,
                to: `whatsapp:+1${newProvider.phone}`
            })
            .then(message => console.log(message.sid))
            .done();
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProvider = async (req, res) => {
    const { id: _id } = req.params;
    const Provider = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Provider with that id');

    const updatedProvider = await provider.findByIdAndUpdate(_id, { ...Provider, _id }, { new: true });

    res.status(202).json(updatedProvider);
}