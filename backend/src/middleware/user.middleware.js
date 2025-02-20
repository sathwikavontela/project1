import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


const verifyJwt = (req, res, next) => {
    const token = req.cookies.userToken;
    //console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error); 
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  

export {verifyJwt};





///what we generally take to the middleware request,response,nextr
//wjhy next is used because next() will go the other middleware or func
///to pass the control over to other middleware we use this next