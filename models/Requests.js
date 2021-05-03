import mongoose from 'mongoose';


const requestSchema = mongoose.Schema({
    requester: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Requester',
        required:true 
    },
    category: {
        type: String,
        required: true
    },
    registrants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        unique:true
    }]
})

const request = mongoose.model('Request',requestSchema);
export default request;