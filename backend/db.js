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

// Create the model

const User = mongoose.model('User', userSchema)

// Export the model
module.exports = User;
    

