const mongoose = require("mongoose");
const artistSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        imageURL:{
            type:String,
            require:true,
        },
        facebook:{
            type:String,
            require:true,
        },
        instagram:{
            type:String,
            require:true,
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model("artists",artistSchema)