const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    gymname:String,
    password:String
});

const owner = mongoose.model("Owner",ownerSchema);
module.exports = owner;