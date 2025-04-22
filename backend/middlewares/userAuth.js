import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const userAuth = await req.headers.authorization;

  if (!userAuth) {
    return res.status(401).json({ success: false, message: "No Token Provided, Access Denied UnAuthenticated" });
  }
  const userToken = userAuth.split(" ")[1];

  if (userToken) {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    req.user = decodedToken.id;
    next();
  } else {
    return res.status(403).json({ success: false, message: "You Are Not Allowed To Access This Resources." });
  }

};

export default userAuth;