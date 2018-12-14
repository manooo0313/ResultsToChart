var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
var Skater          = require("./models/skater");
var Competition     = require("./models/competition");
//var DistanceResult  = require("./models/distanceResult"); 



//mongoose.connect("mongodb://localhost/results_to_chart");
mongoose.connect("mongodb://localhost:27017/results_to_chart", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Skater.create(
//    {
//                name: "Ina Les",
//                image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
//                dateOfBirth:"21.02.2001."
//
//        
//    }, function(err, skater){
//        if(err){
//            console.log(err);
//        } else {
//            console.log("newly created skater");
//            console.log(skater);
//        }
//    });


// var skaters = [
//        {name: "Bor Luka Urlep", image: "https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_960_720.jpg", dateOfBirth:"21.01.2000."},
//        {name: "Ina Les", image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png", dateOfBirth:"21.02.2001."},
//        {name: "Tibor Komericki", image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", dateOfBirth:"21.03.2004."}
//    ];



//Root Route
app.get("/", function(req, res){
   res.render("landing");
});

// INDEX Route - Show all the Skaters
app.get("/skaters", function(req, res){
        Skater.find({}, function(err, allSkaters){
            if(err){
                console.log(err);
            } else {
                res.render("index", {skaters:allSkaters});
            } 
        });
});

//CREATE Route - Add a New Skater
app.post("/skaters", function(req, res){
   //get data from the form and add to skaters array
   var name = req.body.name;
   var image = req.body.image;
   var dateOfBirth = req.body.dateOfBirth;
   var newSkater  = {name: name, image: image, dateOfBirth: dateOfBirth};
   //Create a new skater and save it to DB
   Skater.create(newSkater, function(err, newlyCreatedSkater){
       if(err){
           console.log(err);
           res.redirect("/skaters/new");
       } else {
            //redirect to the skaters page
            res.redirect("/skaters");
       }
   });
});

//NEW Route - Show the form to crate new skater
app.get("/skaters/new", function(req, res) {
   res.render("new");
});

//SHOW Route - Show one particular skater and his/her chart 
app.get("/skaters/:id", function(req,res){
    //find the skater with the provided ID
    Skater.findById(req.params.id).populate("competitions").exec(function(err, foundSkater){
       if(err){
           console.log(err);
       } else {
            //render the show template with that skater
            res.render("show", {skater: foundSkater});
            //console.log(foundSkater);
       }
    });
});

// COMPETITION ROUTES

//NEW route - render the NewCompetition template

app.get("/skaters/:id/competitions/new", function(req, res){
        Skater.findById(req.params.id, function(err, foundSkater){
           if(err){
               console.log(err);
           } else {
                res.render("newCompetition", {skater: foundSkater});
           }
    });
});

// CREATE route - Create a new competition

app.post("/skaters/:id/competitions", function(req, res){
   //lookup skater using ID
   Skater.findById(req.params.id, function(err, skater){
       if(err){
           console.log(err);
           res.redirect("/skaters");
       } else {
        Competition.create(req.body.competition, function(err, competition){
           if(err){
               console.log(err);
           } else {
                competition.skater = req.params.id;
                //save competition
                competition.save();
                skater.competitions.push(competition);
                skater.save();
                //console.log(competition);
                //console.log(skater);
                res.redirect("/skaters/" + skater._id);
           }
        });
       }
   });
   //create new competition
   //connect new competition to skater
   //redirect skater/:id show page
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Resuts to Chart Server has started!");
});