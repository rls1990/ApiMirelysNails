import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    //.connect("mongodb://127.0.0.1:27017/manicuridb")
    .connect(
      "mongodb+srv://roilanlauzsot:FcBHZuRdO7L0nUQJ@basedatosprueba.q0ywerb.mongodb.net/manicuridb?retryWrites=true&w=majority"
    )
    .then(() => console.log(">>> Conected mongodb"))
    .catch((err) => console.log(err));
};
