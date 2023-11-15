import Horario from "../models/horarios.model.js";

//*********************************************************************************************************/

export const horarios = async (req, res) => {
  try {
    const horarioslist = await Horario.find();
    res.json(horarioslist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const getHorarioByID = async (req, res) => {
  try {
    const { id } = req.params;
    const horario = await Horario.findById(id);
    res.json(horario);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error"] });
  }
};

//*********************************************************************************************************/

export const createHorario = async (req, res) => {
  try {
    if (req.body) {
      const newHorario = new Horario(req.body);
      const savehorario = await newHorario.save();
      res.json(savehorario);
    } else res.status(400).json({ message: ["Error data."] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const updateHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const horarioUpdate = await Horario.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(horarioUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/

export const deleteHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const horariodel = await Horario.findByIdAndDelete(id);
    res.json(horariodel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error."] });
  }
};

//*********************************************************************************************************/
