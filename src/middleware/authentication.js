const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log('req.header("Authorization"):', req.header("Authorization"))
  console.log('token:', token)

  if (!token) {
    return res.status(403).json({
      message: "No token provides, authorization denied",
    });
  }
  
  try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded:', decoded)
    req.user = decoded;
    next();

  }catch(error){
    res.status(401).json({message:"Invalid token."})
  }
};

module.exports = authenticateJWT;
