import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { carruselhomeShema } from "../validators/carruselhome.shema.js";
import { uploadMemo } from "../libs/upload.js";
import {
  create,
  deleteImg,
  getByID,
  getImagen,
  getImagenesCarruselhome,
  update,
} from "../controllers/carruselhome.controller.js";

//********************************************************************************/

const router = Router();

router.get("/carruselhome", getImagenesCarruselhome);
router.get("/carruselhome/:id", getByID);
router.get("/carruselhome/imgcarruselhome/:id/:nombre/:tipo", getImagen);

router.post(
  "/carruselhome",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(carruselhomeShema),
  create
);

router.put(
  "/carruselhome/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(carruselhomeShema),
  update
);

router.delete("/carruselhome/:id", authRequired, isAdmin, deleteImg);

export default router;
