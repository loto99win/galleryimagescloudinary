const { Schema, model } = require('mongoose');

const avatarSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    avatar: {
        type:String,
        required:true
    },
    cloudinary_id: {
        type:String,
        required:true
    },
    width: {
        type:Number
    },
    height: {
        type:Number
    },
    format: {
        type:String
    },
    resource_type: {
        type:String
    },
    bytes: {
        type:Number
    }
},
{
    timestamps: true
});

module.exports = model('Avatar', avatarSchema);