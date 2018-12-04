var mongoose = require("mongoose");


var distanceResultSchema = new mongoose.Schema({
    skillrace: String,
    dist222m: String,
    dist333m: String,
    dist500m: String,
    dist1000m: String,
    dist1500m: String,
    competition: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competition"
        }
        ],
    skater: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Skater"
        }
        ]
});

module.exports = mongoose.model("DistanceResult", distanceResultSchema);