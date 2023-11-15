import { Schema, model } from "mongoose";

const preguntaShema = new Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String },
});

export default model("pregunta", preguntaShema);
