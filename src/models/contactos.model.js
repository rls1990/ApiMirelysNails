import { Schema, model } from "mongoose";

const contactoShema = new Schema({
  descripcion: { type: String, required: true },
  direccion: { type: String },
  telefonos: { type: String },
  correos: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  pinterest: { type: String },
});

export default model("contacto", contactoShema);
