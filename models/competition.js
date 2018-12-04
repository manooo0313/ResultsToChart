var mongoose = require("mongoose");


var competitionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    distanceResult: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DistanceResult"
        }
        ],
    skater: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Skater"
        }
        ]
});

module.exports = mongoose.model("Competition", competitionSchema);