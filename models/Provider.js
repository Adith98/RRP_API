import mongoose from 'mongoose';

const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        length:10,
        required:true
    },
    dob: {
        type: Date,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
});


const provider = mongoose.model('provider',providerSchema);

export default provider;


/*
const Requester = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    unique:true
})
export default mongoose.model('Requester',Requester);

*/