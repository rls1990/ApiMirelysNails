import { Schema, model } from "mongoose";

const serviciosShema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

export default model("servicios", serviciosShema);
