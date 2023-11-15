import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { equipoShema } from "../validators/equipo.shema.js";
import { uploadMemo } from "../libs/upload.js";
import {
  create,
  getByID,
  getImagen,
  getEquipo,
  deleteEquip,
  update,
} from "../controllers/equipo.controller.js";

import {
  deleteImage,
  getImage,
  getImagenById,
  getImagenes,
  getImagenesByMiembro,
  updateImage,
  uploadImage,
} from "../controllers/diploma.controller.js";

//********************************************************************************/

const router = Router();

router.get("/equipo", getEquipo);
router.get("/equipo/:id", getByID);
router.get("/equipo/imgmiembro/:id/:nombre/:tipo", getImagen);

router.post(
  "/equipo",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(equipoShema),
  create
);

router.put(
  "/equipo/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(equipoShema),
  update
);

router.delete("/equipo/:id", authRequired, isAdmin, deleteEquip);

//********************************************************************************/

router.get("/diploma", getImagenes);
router.get("/diploma/:id", getImagenById);
router.get("/diploma/imgdiploma/:id/:nombre", getImage);
router.get("/diploma/imgdiplomapormiembro/:miembro", getImagenesByMiembro);

router.post(
  "/diploma",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  uploadImage
);

router.put(
  "/diploma/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  updateImage
);

router.delete("/diploma/:id", authRequired, isAdmin, deleteImage);

export default router;
