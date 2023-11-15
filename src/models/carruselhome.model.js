import { Schema, model } from "mongoose";

const carruselhomeShema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  imagen: { type: String },
});

export default model("carruselhome", carruselhomeShema);
