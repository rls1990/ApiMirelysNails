import { Schema, model } from "mongoose";

const horariosShema = new Schema({
  titulo: { type: String, required: true },
  rango: { type: String, required: true },
});

export default model("horarios", horariosShema);
