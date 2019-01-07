var mongoose = require("mongoose");


var competitionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: { type: Date, default: Date.now, required: true},
    location: {type: String, required: true},
    skater: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Skater"
        }
        ],
    
    skillrace: String,
    dist222m: String,
    dist333m: String,
    dist500m: String,
    dist777m: String,
    dist1000m: String,
    dist1500m: String
    
});

module.exports = mongoose.model("Competition", competitionSchema);


