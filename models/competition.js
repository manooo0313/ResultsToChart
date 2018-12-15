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
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Results"
        }
        ]
});

module.exports = mongoose.model("Competition", competitionSchema);


