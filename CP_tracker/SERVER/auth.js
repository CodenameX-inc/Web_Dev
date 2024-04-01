import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const auth = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization;
    //check if the token matches the supposed origin
    const decodeToken=jwt.verify(token, "RANDOM-TOKEN")
    if(decodeToken){
      request.body.user = decodeToken.USERID;
      next();
    }
    //ADDING THE FOLLOWING LINES WILL GIVE ERR_HTTP_HEADERS_SENT error
      // else{
      //   return response.status(401).send({
      //     message: "Can't verify Token, Unauthorized Access"
      //   })
      // }
      // if(err){
      //   return response.status(401).send({
      //     message: "Invalid Token, Unauthorized Access"
      //   })
      // }
    
  } 
  catch (error) {
    return response.status(401).send({
      error: error.message,
    });
  }
};

export default auth;