const mongoose = require("mongoose");
const MSchema = mongoose.Schema;
//mongoose.set("useFindAndModify", false); deprecated

const postSchema = new MSchema({
    comment: String   

});
module.exports = mongoose.model("Post", postSchema);