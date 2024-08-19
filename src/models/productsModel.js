const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ProductName:{
        type:String,
        required: true //If the value of this field is not given, the system will display an error.
    },
    ProductImage:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required: true,
    },
    Price:{
        type:Number,
        required: true
    },
    Category:{
        type:String,
        required: true
    },
    Ratings :{
        type:Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,  // এখানে ডিফল্ট ভ্যালু হিসেবে বর্তমান তারিখ এবং সময় সেট করা হবে
    },
},
{
  versionKey: false
}
);
const productsModel =  mongoose.model("productCollection",productSchema); //databaser aer collection name hobe

module.exports = productsModel;
