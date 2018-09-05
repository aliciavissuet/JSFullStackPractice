const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const AacGridSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    name:{
        type:String,
    },
    avatar:{
        type:String
    },
    favorites:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    lastEdited:{
        type:Date,
        default:Date.now
    },
    gridItems:[{

        text:{
            type:String,
            required:true,
        },

        image:{
            type:String
        },
        }
    ]


});

module.exports = Post = mongoose.model('aacgrids', AacGridSchema);