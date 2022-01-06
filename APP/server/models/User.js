const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        min: 3, 
        max : 20,
        required: true,
        unique: true
    },
    email :{
        type : String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        min : 6,
        required : true
    },
    profilePicture :{
        type : String,
        default : ""
    },
    desc: {
        type : String,
        max: 1024,
        default: ""
    },
    coverPicture : {
        type : String,
        default : ""
    },
    followers : {
        type : Array,
        default : []
    },
    following :{
        type : Array,
        default : []
    },
    city:{
        type: String,
        default: ""
    },
    from:{
        type: String,
        default: ""
    },
    relationship:{
        type: String,
        default: "Single"
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    },
    isAdmin :{
        type : Boolean,
        default : false
    }
},{
    timestamps: true
}, 
{
   collection : 'users' 
})

module.exports = mongoose.model("User", UserSchema);
