const authenticateUser = (req, res, next) => {
    console.log("Session details:", req.session); // Debug session details
    console.log("Is authenticated:", req.isAuthenticated()); // Debug the authentication check
  
    if (req.isAuthenticated()) {
      console.log("Authenticated user:", req.user);
      return next();
    }
  
    return res.status(401).json({
      message: "Unauthorized",
    });
  };

module.exports = authenticateUser;