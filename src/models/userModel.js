const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // ইমেইল ভ্যালিডেশন চেক
    },
    photoURL:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,  // এখানে ডিফল্ট ভ্যালু হিসেবে বর্তমান তারিখ এবং সময় সেট করা হবে
    }
},
{
  versionKey: false
}
);
const usersModel =  mongoose.model("userCollection",userSchema); //databaser aer collection name hobe

module.exports = usersModel;
