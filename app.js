var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
//var Skater          = require("./models/skater");
//var Competition     = require("./models/competition");
//var DistanceResult  = require("./models/distanceResult"); 



//mongoose.connect("mongodb://localhost/results_to_chart");
mongoose.connect("mongodb://localhost:27017/results_to_chart", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var skaters = [
        {name: "Bor Luka Urlep", image: "https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_960_720.jpg", dateOfBirth:"21.01.2000."},
        {name: "Ina Les", image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png", dateOfBirth:"21.02.2001."},
        {name: "Tibor Komericki", image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", dateOfBirth:"21.03.2004."}
    ];



//Root Route
app.get("/", function(req, res){
   res.render("landing");
});

// Show all the Skaters
app.get("/skaters", function(req, res){
    res.render("skaters", {skaters:skaters});
});

//Add a New Skater
app.post("/skaters", function(req, res){
   //get data from the form and add to skaters array
   var name = req.body.name;
   var image = req.body.image;
   var dateOfBirth = req.body.dateOfBirth;
   var newSkater  = {name: name, image: image, dateOfBirth: dateOfBirth};
   skaters.push(newSkater);
   //redirect to the skaters page
   res.redirect("/skaters");
});

//Render the new skater form
app.get("/skaters/new", function(req, res) {
   res.render("new");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Resuts to Chart Server has started!");
});