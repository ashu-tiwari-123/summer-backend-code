const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var parentSchema = new mongoose.Schema({
  image:{
    type:String,
  },
  name: {
    type: String,
    unique:true,
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
  },
});

//Export the model
module.exports = mongoose.model("Parent", parentSchema);
