import Carruselhome from "../models/carruselhome.model.js";
import { resizeImage } from "../libs/image.js";
import { __carruselhome, deleteFile } from "../libs/file.js";
import path from "path";

//*********************************************************************************************************/

export const getImagenesCarruselhome = async (req, res) => {
  try {
    const list = await Carruselhome.find();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Carruselhome.findById(id);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const create = async (req, res) => {
  try {
    const newRow = new Carruselhome(req.body);

    let originalname,
      buffer,
      filename = "";

    console.log(req.file);

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;

      newRow.imagen = filename;
    }
    const savenewRow = await newRow.save();

    if (req.file) {
      const from = buffer;
      const to = __carruselhome;
      Promise.all([
        resizeImage(from, to + "medium-" + filename, 500),
        resizeImage(from, to + "large-" + filename, 1024),
      ]).then(() => console.log("Imagenes copiadas."));
    }

    res.json(savenewRow);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const row = await Carruselhome.findById(id);

    row.titulo = titulo;
    row.descripcion = descripcion;

    let lastFileName = row.imagen;
    if (req.file) {
      row.imagen = filename;
    }

    const updateRow = await row.save();

    if (req.file) {
      const from = buffer;
      const to = __carruselhome;
      Promise.all([
        deleteFile(__carruselhome + "medium-" + lastFileName),
        deleteFile(__carruselhome + "large-" + lastFileName),
        resizeImage(from, to + "medium-" + filename, 500),
        resizeImage(from, to + "large-" + filename, 1024),
      ]).then(() => console.log("Imagen actualizada."));
    }

    res.json(updateRow);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Carruselhome.findByIdAndDelete(id);
    const filename = item.imagen;

    Promise.all([
      deleteFile(__carruselhome + "medium-" + filename),
      deleteFile(__carruselhome + "large-" + filename),
    ]).then(() => console.log("Imagen eliminada."));

    res.json({ message: ["Servicio Eliminado."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagen = async (req, res) => {
  try {
    const { id, tipo } = req.params;
    const item = await Carruselhome.findById(id);
    if (tipo == "medium" || tipo == "large") {
      const filename = tipo + "-" + item.imagen;
      res.sendFile(path.resolve(__carruselhome, filename))
    } else {
      return res.status(400).json({ message: ["Error."] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
