import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { serviciosShema } from "../validators/servicios.shema.js";
import { upload, uploadMemo } from "../libs/upload.js";
import {
  createServicio,
  deleteServicio,
  getImagenServicio,
  getServicioByID,
  servicios,
  updateServicio,
} from "../controllers/servicios.controller.js";

//********************************************************************************/

const router = Router();

router.get("/servicios", servicios);
router.get("/servicios/:id", getServicioByID);
router.get("/servicios/imgservicio/:id/:nombre/:tipo", getImagenServicio);

router.post(
  "/servicios",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(serviciosShema),
  createServicio
);

router.put(
  "/servicios/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(serviciosShema),
  updateServicio
);

router.delete("/servicios/:id", authRequired, isAdmin, deleteServicio);

export default router;
