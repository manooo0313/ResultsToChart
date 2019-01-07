var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var methodOverride  = require('method-override');
var bodyParser      = require("body-parser");
var Skater          = require("./models/skater");
var Competition     = require("./models/competition");
//var Chart           = require('chart.js');
//var DistanceResult  = require("./models/distanceResult"); 



//mongoose.connect("mongodb://localhost/results_to_chart");
mongoose.connect("mongodb://localhost:27017/results_to_chart", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));



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

//CREATE Route - Add a New Skater to DB
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

//SHOW Route - Shows one particular skater more info and his/her chart 
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

//EDIT Route - render the edit form with the existing data
app.get("/skaters/:id/edit", function(req, res) {
    Skater.findById(req.params.id, function(err, foundSkater) {
        if(err){
            console.log(err);
        } else {
            res.render("editSkater", {skater: foundSkater});
        }
    });
});

//UPDATE Route - update a skater with the data from the edit form
app.put("/skaters/:id", function(req, res){
    Skater.findByIdAndUpdate(req.params.id, req.body.skater, {new: true}, function(err, updatedSkater){
        if(err){
            console.log(err);
            res.redirect("/skaters");
        } else {
            //console.log(updatedSkater);
            res.redirect("/skaters/" + req.params.id);
        }
    });
});

//DESTROY Route - delete the selected skater
app.delete("/skaters/:id", function(req, res){
    Skater.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/skaters");
        } else {
            res.redirect("/skaters");
        }
    });
});

//=======================
// COMPETITION ROUTES
//=======================

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
                console.log(competition);
                console.log(skater);
                res.redirect("/skaters/" + skater._id);
           }
        });
       }
   });
   //create new competition
   //connect new competition to skater
   //redirect skater/:id show page
});

//EDIT Route - Rendering the edit form with the existing competition data
app.get("/skaters/:id/competitions/:competition_id/edit", function(req, res) {
   Competition.findById(req.params.competition_id, function(err, foundCompetition) {
      if(err){
            res.redirect("/skaters");
      } else {
          //console.log(foundCompetition);
          //console.log(foundCompetition.skater);
        res.render("editCompetition", {competition: foundCompetition});          
      }
   }); 
});

//UPDATE Route - update a skater's Competition with the data from the editCompetition form
app.put("/skaters/:id/competitions/:competition_id", function(req, res){
   Competition.findByIdAndUpdate(req.params.competition_id, req.body.competition, function(err, updatedCompetition){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/skaters/" + req.params.id);
       }
   });
});

//DESTROY Route - delete the selected competition
app.delete("/skaters/:id/competitions/:competition_id", function(req, res){
   Competition.findByIdAndRemove(req.params.competition_id, function(err){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/skaters/" + req.params.id);
      }
   });
});


//RESULTS ROUTES

//NEW Route - render the from to add new result to a paricular competition
//app.get("/skaters/:id/competitions/:competition_id/results/new", function(req, res) {
//    Competition.findById(req.params.competition_id, function(err, foundCompetition) {
//        if(err){
//            console.log(err);
//            res.redirect("back");
//        } else {
//            //console.log(foundCompetition);
//            res.render("newResult", {competition: foundCompetition});
//        }
//    });
//});

//CREATE Route - Create a new result 
//app.post("/skaters/:id/competitions/:competition_id/results", function(req, res) {
//   Competition.findById(req.params.competition_id, function(err, foundCompetition) {
//        if(err){
//            console.log(err);
//            res.redirect("back");
//        } else {
//            DistanceResult.create(req.body.distanceResult, function(err, distanceResult) {
//                if(err){
//                    
//                    console.log(err);
//                    res.redirect("back");
//                } else {
//                    distanceResult.skater = req.params.id;
//                    distanceResult.competition = req.params.competition_id;
//                    //save distanceResult
//                    distanceResult.save();
//                    console.log(req.body.distanceResult);
//                    console.log(req.body.distanceResult.distance);
//                    foundCompetition.results.push(distanceResult);
//                    foundCompetition.save();
//                    console.log(foundCompetition);
//                    //console.log(distanceResult);
//                    //console.log(foundCompetition.skater);
//                    res.redirect("/skaters/" + foundCompetition.skater);
//                }
//                
//            });
//        }
//   }); 
//});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Resuts to Chart Server has started!");
});