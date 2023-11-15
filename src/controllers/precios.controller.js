import Precios from "../models/precios.model.js";

//*********************************************************************************************************/

export const precios = async (req, res) => {
  try {
    const precioslist = await Precios.find();
    res.json(precioslist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getPrecioByID = async (req, res) => {
  try {
    const { id } = req.params;
    const precio = await Precios.findById(id);
    res.json(precio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error"] });
  }
};

//*********************************************************************************************************/

export const createPrecio = async (req, res) => {
  try {
    const newPrecio = new Precios(req.body);
    const savePrecio = await newPrecio.save();
    res.json(savePrecio);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const updatePrecio = async (req, res) => {
  try {
    const { id } = req.params;
    const precioUpdate = await Precios.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(precioUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deletePrecio = async (req, res) => {
  try {
    const { id } = req.params;
    const preciodel = await Precios.findByIdAndDelete(id);
    res.json(preciodel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
