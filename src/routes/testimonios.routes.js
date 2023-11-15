import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { testimoniosShema } from "../validators/testimonios.shema.js";
import { uploadMemo } from "../libs/upload.js";
import {
  create,
  deleteTestim,
  getByID,
  getImagen,
  getImagenes,
  update,
} from "../controllers/testimonios.controller.js";

//********************************************************************************/

const router = Router();

router.get("/testimonios", getImagenes);
router.get("/testimonios/:id", getByID);
router.get("/testimonios/imgtestimonios/:id/:nombre", getImagen);

router.post(
  "/testimonios",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(testimoniosShema),
  create
);

router.put(
  "/testimonios/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(testimoniosShema),
  update
);

router.delete("/testimonios/:id", authRequired, isAdmin, deleteTestim);

export default router;
