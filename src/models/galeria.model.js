import { Schema, SchemaType, model } from "mongoose";

const galeriaShema = new Schema({
  servicio: { type: Schema.Types.ObjectId, ref: "servicios" },
  imagen: { type: String },
});

export default model("galeria", galeriaShema);
