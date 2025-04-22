import jwt from "jsonwebtoken";
import "dotenv/config";

const adminAuth = async (req, res, next) => {
  const adminAuth = await req.headers.authorization; // {}
  if (!adminAuth) {
    return res.status(401).json({ success: false, message: "UnAuthenticated" });
  }

  const adminToken = adminAuth.split(" ")[1];

  if (adminToken) {
    const decodedToken = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
    req.admin_email = decodedToken.email; // const admin_email = req.admin_email
    if (decodedToken.email === process.env.ADMIN_EMAIL) {
      next();
    }
  } else {
    return res.status(403).json({ success: false, message: "You Are Not Allowed To Access This Resources." });
  }
};

export default adminAuth;