import Equipo from "../models/equipo.model.js";
import Diploma from "../models/diploma.model.js";
import { resizeImage } from "../libs/image.js";
import { __diplomas, __equipo, deleteFile } from "../libs/file.js";
import path from "path";

//*********************************************************************************************************/

export const getEquipo = async (req, res) => {
  try {
    const list = await Equipo.find();
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
    const item = await Equipo.findById(id);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const create = async (req, res) => {
  try {
    const newRow = new Equipo(req.body);

    let originalname,
      buffer,
      filename = "";

    console.log(req.file);

    if (req.file) {
      console.log(req.file);

      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;

      newRow.foto = filename;
    }
    const savenewRow = await newRow.save();

    if (req.file) {
      const from = buffer;
      const to = __equipo;
      Promise.all([
        resizeImage(from, path.resolve(to , "medium-" + filename), 500),
        resizeImage(from, path.resolve(to , "large-" + filename), 1024),
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
    const { nombre, roll, cometario, facebook, instagram, pinterest } =
      req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const row = await Equipo.findById(id);

    row.nombre = nombre;
    row.roll = roll;
    row.cometario = cometario;

    let lastFileName = row.foto;
    if (req.file) {
      row.foto = filename;
    }

    const updateRow = await row.save();

    if (req.file) {
      const from = buffer;
      const to = __equipo;
      Promise.all([
        deleteFile(path.resolve(to , "medium-" + lastFileName)),
        deleteFile(path.resolve(to , "large-" + lastFileName)),
        resizeImage(from, path.resolve(to , "medium-" + filename), 500),
        resizeImage(from, path.resolve(to , "large-" + filename), 1024),
      ]).then(() => console.log("Imagen actualizada."));
    }

    res.json(updateRow);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteEquip = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Equipo.findByIdAndDelete(id);
    const filename = item.imagen;

    Promise.all([
      deleteFile(path.resolve(__equipo , "medium-" + filename)),
      deleteFile(path.resolve(__equipo , "large-" + filename)),
    ]).then(() => console.log("Imagen eliminada."));

    const diploma = await Diploma.find({ miembro: item._id });

    if (diploma) {
      diploma.forEach((img) => {
        Promise.all([
          Diploma.findByIdAndDelete(img._id),
          deleteFile(path.resolve(__diplomas , img.imagen)),
        ]).then(() => console.log("Imagen eliminada."));
      });
    }

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
    const item = await Equipo.findById(id);
    if (tipo == "medium" || tipo == "large") {
      const filename = tipo + "-" + item.foto;
      res.sendFile(path.resolve(__equipo , filename));
    } else {
      return res.status(400).json({ message: ["Error."] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
