import Servicios from "../models/servicios.model.js";
import Galeria from "../models/galeria.model.js";
import { resizeImage } from "../libs/image.js";
import { __galeria, __servicios, deleteFile } from "../libs/file.js";

import path from "path";

//*********************************************************************************************************/

export const servicios = async (req, res) => {
  try {
    const servicioslist = await Servicios.find();
    res.json(servicioslist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getServicioByID = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await Servicios.findById(id);
    res.json(servicio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const createServicio = async (req, res) => {
  try {
    const newServicio = new Servicios(req.body);

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

      newServicio.imagen = filename;
    }
    const saveServicio = await newServicio.save();

    if (req.file) {
      const from = buffer;
      const to = __servicios;
      Promise.all([
        resizeImage(from, path.resolve(to,"medium-" + filename), 500),
        resizeImage(from, path.resolve(to,"large-" + filename), 1024),
      ]).then(() => console.log("Imagenes copiadas."));
    }

    res.json(saveServicio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    let originalname,
      buffer,
      filename = "";

    if (req.file) {
      originalname = req.file.originalname;
      buffer = req.file.buffer;
      let ext = originalname.split(".").pop();
      filename = Date.now() + "." + ext;
    }

    const servicio = await Servicios.findById(id);

    servicio.nombre = nombre;
    servicio.descripcion = descripcion;

    let lastFileName = servicio.imagen;
    if (req.file) {
      servicio.imagen = filename;
    }

    const updateServicio = await servicio.save();

    if (req.file) {
      const from = buffer;
      const to = __servicios;
      Promise.all([
        //deleteFile(__servicios + "/medium-" + lastFileName),
        deleteFile(path.resolve(__servicios,"medium-" + lastFileName)),
        //deleteFile(__servicios + "/large-" + lastFileName),
        deleteFile(path.resolve(__servicios, "large-" + lastFileName)),
        //resizeImage(from, to + "/medium-" + filename, 500),
        resizeImage(from, path.resolve(to , "medium-" + filename), 500),
        //resizeImage(from, to + "/large-" + filename, 1024),
        resizeImage(from, path.resolve(to , "large-" + filename), 1024),
      ]).then(() => console.log("Imagen actualizada."));
    }

    res.json(updateServicio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicios.findByIdAndDelete(id);
    const filename = servicio.imagen;

    Promise.all([
      //deleteFile(__servicios + "/medium-" + filename),
      //deleteFile(__servicios + "/large-" + filename),
      deleteFile(path.resolve(__servicios , "medium-" + filename)),
      deleteFile(path.resolve(__servicios , "large-" + filename)),
    ]).then(() => console.log("Imagen eliminada."));

    const galeria = await Galeria.find({ servicio: servicio._id });

    if (galeria) {
      galeria.forEach((img) => {
        Promise.all([
          Galeria.findByIdAndDelete(img._id),
          //deleteFile(__galeria + "/"+img.imagen),
          deleteFile(path.resolve(__galeria ,img.imagen)),
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

export const getImagenServicio = async (req, res) => {
  try {
    const { id, tipo } = req.params;
    const servicio = await Servicios.findById(id);
    if (tipo == "medium" || tipo == "large") {
      const filename = tipo + "-" + servicio.imagen;
      res.sendFile(path.resolve(__servicios , filename));
    } else {
      return res.status(400).json({ message: ["Error."] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
