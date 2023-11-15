import Usuario from "../models/usuario.model.js";
import Bcript from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import { __usuarios, deleteFile } from "../libs/file.js";
import { resizeImage } from "../libs/image.js";

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

import path from "path";

//*********************************************************************************************************/

export const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    const usuarioFound = await Usuario.findOne({ nombre });

    if (!usuarioFound) {
      return res.status(400).json({ message: ["Credenciales incorrectas."] });
    }

    const isMatch = await Bcript.compare(password, usuarioFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: ["Credenciales incorrectas."] });
    }

    const token = await createAccessToken({ id: usuarioFound.id });

    res.cookie("token", token, {
      sameSite: 'none',
      secure: true
    });

    res.json(usuarioFound);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const loginAdmin = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    console.log(nombre);
    const usuarioFound = await Usuario.findOne({ nombre });
    if (!usuarioFound) {
      return res.status(400).json({ message: ["Credenciales incorrectas."] });
    } else if (
      usuarioFound.roll === "admin" ||
      usuarioFound.roll === "superadmin"
    ) {
      const isMatch = await Bcript.compare(password, usuarioFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: ["Credenciales incorrectas."] });
      }
      const token = await createAccessToken({ id: usuarioFound.id });
      //res.cookie("token", token);
      /** Otras propiedades
        {
        sameSite: "none",
        secure: true,
        httpOnly: false,
      }
       */

      res.cookie("token", token, {
        sameSite: 'none',
        secure: true
      });
      res.json(usuarioFound);
    } else res.status(400).json({ message: ["Usuario no autorizado."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

//*********************************************************************************************************/

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No autorizado." });
  }

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "No autorizado." });

    const userFound = await Usuario.findById(user.id);

    if (!userFound) {
      return res.status(401).json({ message: "No autorizado." });
    }

    return res.json(userFound);
  });
};

//*********************************************************************************************************/

export const profile = async (req, res) => {
  try {
    const usuarioFound = await Usuario.findById(req.user.id);

    if (!usuarioFound)
      return res.status(400).json({ message: ["Usuario no encontrado"] });

    res.json(usuarioFound);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Usuario.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const getUsersByRoll = async (req, res) => {
  try {
    const regex = new RegExp(req.params.roll, "i");
    const users = await Usuario.find({ roll: regex });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};
//*********************************************************************************************************/

export const registerUser = async (req, res) => {
  try {
    const { password, roll } = req.body;
    console.log(roll);
    if (roll === "user") {
      const passwordHash = await Bcript.hash(password, 10);
      req.body.password = passwordHash;

      const newUser = new Usuario(req.body);
      const saveUser = await newUser.save();

      //const token = await createAccessToken({ id: saveUser.id });
      //res.cookie("token", token);

      res.json(saveUser);
    } else res.status(400).json({ message: ["Error."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: ["Db error."] });
  }
};
//*********************************************************************************************************/

export const createUser = async (req, res) => {
  try {
    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const passwordHash = await Bcript.hash(req.body.password, 10);
    req.body.password = passwordHash;

    const newUser = new Usuario(req.body);
    newUser.foto = filename;
    const saveUser = await newUser.save();

    if (req.file) {
      const from = buffer;
      const to = __usuarios;
      Promise.all([
        resizeImage(from, to + "small-" + filename, 100),
        resizeImage(from, to + "medium-" + filename, 500),
      ]).then(() => console.log("Imagenes copiadas."));
    }

    res.json(saveUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, password, email, roll } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const user = await Usuario.findById(id);

    user.nombre = nombre;
    user.password = await Bcript.hash(password, 10);
    user.email = email;
    user.roll = roll;

    let lastFileName = user.foto;
    if (req.file) {
      user.foto = filename;
    }
    const updateUser = await user.save();

    if (req.file) {
      const from = buffer;
      const to = __usuarios;
      Promise.all([
        deleteFile(__usuarios + "small-" + lastFileName),
        deleteFile(__usuarios + "medium-" + lastFileName),
        resizeImage(from, to + "small-" + filename, 100),
        resizeImage(from, to + "medium-" + filename, 500),
      ]).then(() => console.log("Imagen actualizada."));
    }

    res.json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByIdAndDelete(id);

    const filename = user.foto;
    Promise.all([
      deleteFile(__usuarios + "small-" + filename),
      deleteFile(__usuarios + "medium-" + filename),
    ]).then(() => console.log("Tarea terminada."));

    res.json({ message: ["Usuario eliminado."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const getImgagePerfil = async (req, res) => {
  try {
    const { id, tipo } = req.params;

    const user = await Usuario.findById(id);

    if (tipo == "small" || tipo == "medium") {
      const filename = tipo + "-" + user.foto;
      res.sendFile(path.resolve(__usuarios, filename));
    } else {
      return res.status(400).json({ message: ["Error."] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};
//*********************************************************************************************************/

export const uploadFotoPerfil = async (req, res) => {
  try {
    if (req.file) {
      const user = await Usuario.findById(req.user.id);

      const originalname = req.file.originalname;
      const buffer = req.file.buffer;
      const ext = originalname.split(".").pop();

      const filename = Date.now() + "." + ext;

      const from = buffer;
      const to = __usuarios;

      Promise.all([
        deleteFile(__usuarios + "small-" + user.foto),
        deleteFile(__usuarios + "medium-" + user.foto),
        resizeImage(from, to + "small-" + filename, 100),
        resizeImage(from, to + "medium-" + filename, 500),
      ]).then(() => console.log("Imagenes copiadas."));

      user.foto = filename;

      const userUpd = await user.save();

      res.json(userUpd);
    } else res.staus(400).json({ message: ["Error."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db error."] });
  }
};

//*********************************************************************************************************/

export const uploadImgCarnet = async (req, res) => {
  try {
    const { tipo } = req.params;
    console.log(tipo);
    if ((tipo === "frontal" || tipo === "reverso") && req.file) {
      const user = await Usuario.findById(req.user.id);

      const buffer = req.file.buffer;
      const to = __usuarios;
      const ext = req.file.originalname.split(".").pop();
      const filename = Date.now() + "." + ext;

      await resizeImage(buffer, to + tipo + "-" + filename, 500);

      if (tipo === "frontal") {
        await deleteFile(__usuarios + tipo + "-" + user.carnet.frontal);
        user.carnet.frontal = filename;
      } else {
        await deleteFile(__usuarios + tipo + "-" + user.carnet.reverso);
        user.carnet.reverso = filename;
      }
      const userSave = await user.save();
      res.status(200).json(userSave);
    } else return res.status(400).json({ message: ["Error."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Error al subir la imagen."] });
  }
};

//*********************************************************************************************************/
