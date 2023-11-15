import { __diplomas, deleteFile } from "../libs/file.js";
import { resizeImage } from "../libs/image.js";
import Diploma from "../models/diploma.model.js";
import path from "path";

//*********************************************************************************************************/

export const getImagenes = async (req, res) => {
  try {
    const list = await Diploma.find().populate("miembro");
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagenById = async (req, res) => {
  try {
    const item = await Diploma.findById(req.params.id).populate("miembro");
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagenesByMiembro = async (req, res) => {
  try {
    const item = await Diploma.find({ miembro: req.params.miembro });
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Diploma.findById(id);
    if (item) {
      res.sendFile(path.resolve(__diplomas,item.imagen));
    } else {
      return res.status(400).json({ message: ["Error."] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      const item = new Diploma(req.body);

      const buffer = req.file.buffer;
      const ext = req.file.originalname.split(".").pop();

      const filename = Date.now() + "." + ext;
      const from = buffer;
      const to = __diplomas;

      item.imagen = filename;

      const itemsave = await item.save();

      Promise.all([resizeImage(from, path.resolve(to , filename), 1024)]).then(() =>
        console.log("Imagen copiada.")
      );

      res.json(itemsave);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { miembro } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const item = await Diploma.findById(id);

    item.miembro = miembro;

    let lastFileName = item.imagen;
    if (req.file && lastFileName !== filename) {
      item.imagen = filename;
    }

    const itemupd = await item.save();

    if (req.file) {
      const from = buffer;
      const to = __diplomas;
      Promise.all([
        deleteFile(path.resolve(to , lastFileName)),
        resizeImage(from, path.resolve(to , filename), 1024),
      ]).then(() => console.log("Imagen copiada."));
    }

    res.json(itemupd);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Diploma.findByIdAndDelete(id);

    Promise.all([deleteFile(path.resolve(__diplomas , item.imagen))]).then(() =>
      console.log("Imagen eliminada.")
    );

    res.json({ message: ["Imagen eliminada"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
