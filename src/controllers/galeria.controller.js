import { __galeria, deleteFile } from "../libs/file.js";
import { resizeImage } from "../libs/image.js";
import Galeria from "../models/galeria.model.js";

import path from "path";

//*********************************************************************************************************/

export const getImagenes = async (req, res) => {
  try {
    const list = await Galeria.find().populate("servicio");
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagenById = async (req, res) => {
  try {
    const item = await Galeria.findById(req.params.id).populate("servicio");
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagenesByServicio = async (req, res) => {
  try {
    const item = await Diploma.find({ servicio: req.params.servicio }).populate(
      "servicio"
    );
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
    const item = await Galeria.findById(id);

    const dir="file:///opt/render/project/src/data/img/galeria/1699820374371.png"

    if (item) {
      res.sendFile(path.resolve(__galeria, item.imagen))
      
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
      const item = new Galeria(req.body);

      const buffer = req.file.buffer;
      const ext = req.file.originalname.split(".").pop();

      const filename = Date.now() + "." + ext;
      const from = buffer;
      const to = __galeria;

      item.imagen = filename;

      const itemsave = await item.save();

      Promise.all([resizeImage(from, to + filename, 1024)]).then(() =>
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
    const { servicio } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const item = await Galeria.findById(id);

    item.servicio = servicio;

    let lastFileName = item.imagen;
    if (req.file && lastFileName !== filename) {
      item.imagen = filename;
    }

    const itemupd = await item.save();

    if (req.file) {
      const from = buffer;
      const to = __galeria;
      Promise.all([
        deleteFile(__galeria + lastFileName),
        resizeImage(from, to + filename, 1024),
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

    const item = await Galeria.findByIdAndDelete(id);

    Promise.all([deleteFile(__galeria + item.imagen)]).then(() =>
      console.log("Imagen eliminada.")
    );

    res.json({ message: ["Imagen eliminada"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
