import { Schema, SchemaType, model } from "mongoose";

const diplomaShema = new Schema({
  miembro: { type: Schema.Types.ObjectId, ref: "equipo" },
  imagen: { type: String },
});

export default model("diploma", diplomaShema);
