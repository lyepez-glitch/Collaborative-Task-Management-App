const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: jwt_payload.sub,
                },
            });
            if (user) {
                console.log('user found')
                return done(null, user);
            } else {
                console.log('creating new user');
                return done(null, false);
            }
        } catch (e) {
            console.log('error finding user ', e.message);
            return done(e, false);
        }


    }));
}