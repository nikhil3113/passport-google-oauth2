const jwt = require("jsonwebtoken");

function authenticateUser(req,res,next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Authorization header missing');
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send('UnAuthorized User');
    }
}

module.exports = authenticateUser;