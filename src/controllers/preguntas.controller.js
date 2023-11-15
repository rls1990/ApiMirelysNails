import Preguntas from "../models/preguntas.model.js";

//*********************************************************************************************************/

export const preguntas = async (req, res) => {
  try {
    const list = await Preguntas.find();
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
    const pregunta = await Preguntas.findById(id);
    res.json(pregunta);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error"] });
  }
};

//*********************************************************************************************************/

export const create = async (req, res) => {
  try {
    const newPregunta = new Preguntas(req.body);
    const savePregunta = await newPregunta.save();
    res.json(savePregunta);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const pregUpdate = await Preguntas.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(pregUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deletePreg = async (req, res) => {
  try {
    const { id } = req.params;
    const pregdel = await Preguntas.findByIdAndDelete(id);
    res.json(pregdel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
