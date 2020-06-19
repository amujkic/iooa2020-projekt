//reprezentacija modela user
//ova klasa je kreirana i u MongoDB kao baza sa odredjenim podacima

var bcrypt = require ("bcryptjs"); //dopusta "pretresanje" lozinke admina
var mongoose = require ("mongoose");
const Salt_FACTOR = 10; //postavljanje normi

//prezentacija podataka
var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true}, //unique opcija za nejednakost email računa
    password: {type: String, required: false},
    createdAt: {type: Date, default: Date.now} //ovom linijom koda želimo saznati kada je acc kreiran
});

//ovom linijom koda zelimo postic provjerom lozinke korisnika, ukoliko se ide kreirat ili provjeravat
userSchema.pre ("save", function (done){
    var user = this;
    if (!user.isModified("password")){ //postavljanje uvjeta za provjeru lozinke korisnika
        return done;
    }

    bcrypt.genSalt (Salt_FACTOR, function (err, salt){
        if (err) {return done (err);}
        bcrypt.hash (user.password, salt, function (err, hashhedPassword){
            if (err) {return done (err);}
            user.password = hashhedPassword; //suprotno postavljenom uvjetu, korisnicka lozinka prolazi
            done();
        }); 
    }); //provjera ukoliko lozinka zadovoljava normu
});

//provjera unesene lozinke
userSchema.methods.checkPassword = function (guess, done){
    if (this.password != null){ //uvjet ukoliko lozinka se ne podudara sa postojecom lozinkom
        bcrypt.compare (guess, this.password, function (err, isMatch){
            done (err, isMatch); //lozinka se podudara
        });
    }
}

//ovom linijom koda zelimo povuci podatke o useru
var User = mongoose.model ("User", userSchema);

module.exports = User;