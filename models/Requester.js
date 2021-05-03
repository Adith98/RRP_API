import mongoose from 'mongoose';

const requesterSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
});

requesterSchema.index({name:1,location:1},{unique:true});

const requester = mongoose.model('Requester',requesterSchema);
export default requester;





