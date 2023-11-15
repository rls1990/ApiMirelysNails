import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    telefono: String,
    roll: {
      type: String, // El rol puede ser user(usuarios), admin y superadmin para los administradores.
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    foto: {
      // la foto de perfil
      type: String,
    },
    carnet: { frontal: String, reverso: String }, //la foto de carnet frontal y reverso.
  },
  {
    timestamps: true,
  }
);

usuarioSchema.set("toJSON", {
  transform: (doc, objectReturn) => {
    delete objectReturn.password;
  },
});

export default model("usuario", usuarioSchema);
