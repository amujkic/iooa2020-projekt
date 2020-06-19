//pozivanje funkcija za postavku tok registracija korisnika u bazu podataka
var passport = require ("passport");
var LocalStrategy = require ("passport-local").Strategy;
var user = require ("./modeli/user");

module.export = function (){ //serijalizacija korisnika
    passport.serializeUser (function (user,done){
        done (null, user._id);
    });
    
    passport.deserializeUser (function (id, done){ //pretvorba id u korisnicki objekt
        user.findById (id, function (err, user){
            done (err, user); 
        });
    });

    passport.use ("login", new LocalStrategy({
        usrnameField: 'email',
        passwordField: 'password'
    }, function (email, password, done){
        //zbog toga sto je email adresa jedinstvena i po tome ce se naci korisnik 
        user.findOne ({email: email}, function (err, user){
           if (err) {return done (err); }
           if (!user) {
               return done (null, false, {message: "Ne postoji korisnik sa navedenim E-mail adresom!!"});
               
                //ova linija koda sluzi ukoliko se korisnik hoce ulogirat, a unese ne postojecu email adresu (if user)
                //izbacit ce mu se ova poruka na ekranu 
           } 
           user.checkPassword(password, function (err, isMatch){
               if (err) {return done (err); }
               if (isMatch){
                   return done (null,usr);
               } else {
                   return done (null, false, {message:"Pogresno unesena lozinka!!"});
               }
           });
        })
    }));
        
    
}
