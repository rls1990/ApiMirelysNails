import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Usuario from "../models/usuario.model.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, autorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  const userAut = await Usuario.findById(req.user.id);
  if (userAut.roll === "admin" || userAut.roll === "superadmin") {
    next();
  } else return res.status(401).json({ message: "Usuario no autorizado." });
};
