const express = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./middleware/auth");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

require("./middleware/passport");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true, // Your frontend URL
    credentials: true, // Enable cookies to be sent with requests
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret:  process.env.SESSION_SECRET,
  })
);

const port = 3000;

const prisma = new PrismaClient();

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  (req, res) => {
    res.redirect(`http://localhost:5173/profile`);
  }
);

app.get("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "User is not authenticated",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  res.status(200).json({
    email: user.email,
    name: user.name,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
