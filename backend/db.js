const mongoose = require ("mongoose")

mongoose.connect("mongodb://localhost:27017/paytm", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const {Schema} = mongoose;
 
// Define the user Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    firstName : {
        type : String, 
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String, 
        required : true,
        trim : true,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId ,// reference to the user model
        ref : 'User',
        required: true
    },
    balance : {
        type : Number,
        required : true
    }
})

// Create the model

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

// Export the model
module.exports = {
    User,
    Account
};
    

