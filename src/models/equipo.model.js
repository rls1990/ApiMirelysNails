import { Schema, model } from "mongoose";

const equipoShema = new Schema({
  nombre: { type: String, required: true },
  roll: { type: String },
  cometario: { type: String },
  foto: { type: String },
});

export default model("equipo", equipoShema);
