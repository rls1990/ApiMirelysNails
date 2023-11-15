import User from "../models/usuario.model.js";
import Bcript from "bcrypt";

export const defaultUser = async () => {
  try {
    const passwordHash = await Bcript.hash("admin123", 10);
    const userdefault = new User({
      nombre: "admin123",
      email: "admin123@gmail.com",
      roll: "admin",
      password: passwordHash,
      foto: "no dir",
    });
    const userF = await User.findOne({ nombre: userdefault.nombre });
    if (!userF) {
      await userdefault.save();
      console.log(">>> Default user created.");
    } else console.log(">>> Default user defined.");
  } catch (error) {
    console.log(">>> No default User");
  }
};
