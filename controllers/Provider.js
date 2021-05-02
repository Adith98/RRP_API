import mongoose from 'mongoose';

import provider from '../models/Provider.js'

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
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProvider = async (req, res) => {
    const { id: _id } = req.params;
    const Provider = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Provider with that id');

    const updatedProvider = await provider.findByIdAndUpdate(_id, { ...Provider, _id }, { new: true });

    res.json(updatedProvider);
}