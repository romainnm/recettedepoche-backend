//1. Get jwt
const jwt = require("jsonwebtoken");

//3. Create the middleware
const authMiddleware = (req, res, next) => {
  //a. Check for the header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(400).json({ msg: "Access Denied" });
  }

  //b. Get the token
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_PWD);
  try {
    //c. Get the payload
    //d. pass to the payload to the route we want
    // setting a new property on req?
    req.user = { userId: payload.userId };
    req.role = { admin: payload.admin };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Access Denied" });
  }
};

module.exports = authMiddleware;
