const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if(!req.user){
        res.status(401);
        throw new Error("Not Authorized, user not found !!")
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }



  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isExpert = (req,res,next)=>{
  if(req.user && req.user.role==='expert'){
    next();
  }else{
    res.status(403);
    throw new Error("Access Denied!!!,You must be an Expert to perform this action")
  }
}

const isSeeker=(req,res,next)=>{
  if(req.user && req.user.role==='seeker'){
    next();
  }else{
    res.status(403);
    throw new Error("You must be a seeker to perfrom this action")
  }
}


module.exports = { protect ,isExpert,isSeeker};
