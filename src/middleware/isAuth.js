const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secretEnv");
const isAuthCheck = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "forbidden access",
    });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "forbidden access",
      });
    }

    req.authUser = decoded;
    next();
  });
};

module.exports = {
  isAuthCheck,
};
