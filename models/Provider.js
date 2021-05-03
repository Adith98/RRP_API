import mongoose from 'mongoose';

const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        length:10,
        required:true,
        index:true,
        unique:true
    },
    dob: {
        type: Date,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    categories: {
        type: Array,
        required:true
    },
});


const provider = mongoose.model('provider',providerSchema);
export default provider;