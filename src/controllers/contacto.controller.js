import Contacto from "../models/contactos.model.js";

//*********************************************************************************************************/

export const contactos = async (req, res) => {
  try {
    const list = await Contacto.find();
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
    const contact = await Contacto.findById(id);
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error"] });
  }
};

//*********************************************************************************************************/

export const create = async (req, res) => {
  try {
    const newCont = new Contacto(req.body);
    const saveCont = await newCont.save();
    res.json(saveCont);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const contactUpdate = await Contacto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(contactUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contdel = await Contacto.findByIdAndDelete(id);
    res.json(contdel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
