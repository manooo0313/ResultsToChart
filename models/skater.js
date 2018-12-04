var mongoose = require("mongoose");


var skaterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: String,
    dateOfBirth: {type: String, required: true},
    competitions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Competition"
        }
        ]
});

module.exports = mongoose.model("Skater", skaterSchema);