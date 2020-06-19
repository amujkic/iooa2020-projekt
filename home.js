var express = require ("express");
var router = express.Router ();
var passport = require ("passport");
var user = require ("../../modeli/user");

router.get("/", function (req,res){
    console.log("Dobrodosli na službenu stranicu za narudžbu namještaja po mjeri!!");
    res.render("Home/index");
    });
    
    router.get("/home", function (req,res){
        res.render("Home/home");
    });

    router.get("/about", function (req,res){
        res.render("Home/about");
    });

router.get("/log in", function (req,res){
    res.render("Home/login")
});

router.get ("/logout", function (req, res) { //funkcijska linija koda odjave!
    req.logout ();
    res.redirect ("/home");
});

// router.post ("/log in", passport.authenticate ("login", { //logout opcija
//     successRedirect = "/",
//     failureRedirect = "/login",
//     failureFlash = true
// }));

router.get("/order", function (req,res){
    res.render("Home/order")
});

router.post ("/order", function (req, res, next){ //zahvaljujući opciji BodyParser mozemo pristupiti tim podacima koji smo zapisali tokom registracije
    // knjiženje korisnika
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    user.findOne ({email: email}, function (err, user){ //naredba Mongo-u ukoliko ova naredba postoji
        if (err) {return next (err); }
        if (user){
            req.flash ("error", "Već postoji korisnički račun sa ovim e-mailom!!!");
            return res.redirect ("/order"); //preusmjeravanje
        }
        var newUser = new user ({
            username: username, //korisnicko ime je jednak upisanome i ostalo
            password: password,
            email: email
        });
        newUser.save (next); //spremanje korisnickog racuna
    });
});   //autentikacija korisnika


module.exports = router;