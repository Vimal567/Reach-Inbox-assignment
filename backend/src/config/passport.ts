
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser((u:any,d)=>d(null,u));
passport.deserializeUser((u:any,d)=>d(null,u));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
},(_,__,profile,done)=>done(null,profile)));
