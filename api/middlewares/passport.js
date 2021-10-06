const passport = require('passport')
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const User = require('../models/user.model')

passport.use(new JWTStrategy({
        secretOrKey   : process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    function (jwtPayload, done) {
        User.findOne({ id: jwtPayload.sub, role: 'ROLE_ADMIN' })
            .then(user => {
                console.log(user)
                return done(null, user);
            }).catch(err => {
                return done(err);
            });
    }
))