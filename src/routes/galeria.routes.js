import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { upload, uploadMemo } from "../libs/upload.js";
import {
  deleteImage,
  getImage,
  getImagenById,
  getImagenes,
  updateImage,
  uploadImage,
} from "../controllers/galeria.controller.js";

//********************************************************************************/

const router = Router();

router.get("/galeria", getImagenes);

router.get("/galeria/:id", getImagenById);
router.get("/galeria/imggaleria/:id/:nombre", getImage);

router.post(
  "/galeria",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  uploadImage
);

router.put(
  "/galeria/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  updateImage
);

router.delete("/galeria/:id", authRequired, isAdmin, deleteImage);

export default router;
