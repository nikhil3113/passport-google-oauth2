const express = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./middleware/auth");
const cors = require('cors')

require("./middleware/passport");

const app = express();
app.use(cors())
const port = 3000;

const prisma = new PrismaClient();

app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.redirect(`http://localhost:5173/profile?token=${token}`);
  }
);

app.get("/profile", authenticateUser, async (req, res) => {
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
