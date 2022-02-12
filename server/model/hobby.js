const mongoose = require("mongoose");
const MSchema = mongoose.Schema;
//mongoose.set("useFindAndModify", false); deprecated

const hobbySchema = new MSchema({
    title: String,
    description: String       

});
module.exports = mongoose.model("Hobby", hobbySchema);