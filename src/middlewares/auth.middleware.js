const jwt  = require("jsonwebtoken");


async function authMiddleware(req, res, next){
    try{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

     // console.log(authHeader);
    const accessToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    
    // id: "68a123...",
    // role: "student",
    // iat: 1755350000,
    // exp: 175535090

    next();

    } catch (error) {
        return res.status(401).json({
            message: "Access token expired or invalid"
        });
    }

}



module.exports = authMiddleware;