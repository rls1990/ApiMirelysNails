import { Schema, model } from "mongoose";

const testimonioShema = new Schema({
  nombre: { type: String, required: true },
  cometario: { type: String },
  roll: { type: String },
  foto: { type: String },
});

export default model("testimonio", testimonioShema);
