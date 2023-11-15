import Testimonio from "../models/testimonio.model.js";
import { resizeImage } from "../libs/image.js";
import { __testimonios, deleteFile } from "../libs/file.js";
import path from "path";

//*********************************************************************************************************/

export const getImagenes = async (req, res) => {
  try {
    const list = await Testimonio.find();
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
    const item = await Testimonio.findById(id);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const create = async (req, res) => {
  try {
    const newRow = new Testimonio(req.body);

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
      const to = __testimonios;
      Promise.all([resizeImage(from, path.resolve(to , filename), 500)]).then(() =>
        console.log("Imagen copiada.")
      );
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
    const { nombre, cometario, roll } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const row = await Testimonio.findById(id);

    row.nombre = nombre;
    row.cometario = cometario;
    row.roll = roll;

    let lastFileName = row.foto;
    if (req.file) {
      row.foto = filename;
    }

    const updateRow = await row.save();

    if (req.file) {
      const from = buffer;
      const to = __testimonios;
      Promise.all([
        deleteFile(path.resolve(to , lastFileName)),
        resizeImage(from, path.resolve(to , filename), 500),
      ]).then(() => console.log("Imagen actualizada."));
    }

    res.json(updateRow);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteTestim = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Testimonio.findByIdAndDelete(id);
    const filename = item.foto;

    Promise.all([deleteFile(path.resolve(__testimonios , filename))]).then(() =>
      console.log("Imagen eliminada.")
    );

    res.json({ message: ["Testimonio Eliminado."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Testimonio.findById(id);

    const filename = item.foto;
    res.sendFile(path.resolve(__testimonios, filename));
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
