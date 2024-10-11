const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const prisma = new PrismaClient();
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //! change url based 
      callbackURL: "https://passport-google-oauth2.vercel.app/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });
        const username =
          profile.displayName || profile.emails[0].value.split("@")[0];
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: username,
              email: profile.emails[0].value,
            },
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
