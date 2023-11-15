import express from "express";

import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js";
import galeriaRoutes from "./routes/galeria.routes.js";
import horariosRoutes from "./routes/horarios.routes.js";
import preciosRoutes from "./routes/precios.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import carruselhomeRoutes from "./routes/carruselhome.routes.js";
import contactoRoutes from "./routes/contacto.routes.js";
import equipoRoutes from "./routes/equipo.routes.js";
import preguntasRoutes from "./routes/preguntas.routes.js";
import testimoniosRoutes from "./routes/testimonios.routes.js";
import mailRoutes from "./routes/mail.routes.js";

//const url = ["http://localhost:5173", "http://localhost:5174", "http://192.168.157.65:5173"];

const url = ["https://mirelysnailsadmin.onrender.com"];

const app = express();

//middleware
/*app.use(
  cors({
    origin: true,
    url,
    credentials: true,
  })
);*/

app.use(cors({
  origin:"https://mirelysnailsadmin.onrender.com",
  credentials:true,
}));
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "https://mirelysnailsadmin.onrender.com");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

//routes
app.use("/api", usuarioRoutes);
app.use("/api", galeriaRoutes);
app.use("/api", horariosRoutes);
app.use("/api", preciosRoutes);
app.use("/api", serviciosRoutes);
app.use("/api", carruselhomeRoutes);
app.use("/api", contactoRoutes);
app.use("/api", equipoRoutes);
app.use("/api", preguntasRoutes);
app.use("/api", testimoniosRoutes);
app.use("/api", mailRoutes);

export default app;
