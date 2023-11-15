import { Schema, model } from "mongoose";

const preciosShema = new Schema({
  titulo: { type: String, required: true },
  precio: { type: String },
  duracion: { type: String },
});

export default model("precios", preciosShema);
