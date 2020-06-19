//zasebne instalacije
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser"); //
var bodyParser = require("body-parser");
var passport = require("passport"); //autentikacija
var session = require("express-session");
var flash = require("connect-flash"); //
var params = require("./params/params"); //koristenje linka za bazu podataka
var setUpPassport = require("./setuppassport"); //povezivanje klase setUpPassport.js

// var routes = require ("./routes");
// mongoDB amel.mujkic@samsungpromo.net pass:Samsung123456789

var app = express();

// setUpPassport(); //pozivanje klase setUpPassport.js

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false })); // izbjeci analizu podataka i pretvaranje u body parser
app.use(cookieParser());
app.use(
  session({
    secret: "GalaxyNote9", //tajni kljuc koji je osiguran, gdje ne moze nitko dohvatit
    resave: false,
    saveUnitinitialized: false,
  })
);

// ova linija koda nosi naziv putovnica koji sluzi sa autentikaciju
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routers/web"));
app.use("/api", require("./routers/api"));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
