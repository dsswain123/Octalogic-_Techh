const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../DB/user');  

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,  
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user); 
      }
      return done(null, false);  
    } catch (err) {
      return done(err, false);  
    }
  })
);