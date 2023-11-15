import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { contactoShema } from "../validators/contacto.shema.js";
import { uploadTemp } from "../libs/upload.js";
import {
  contactos,
  create,
  deleteContact,
  getByID,
  update,
} from "../controllers/contacto.controller.js";

//********************************************************************************/

const router = Router();

router.get("/contacto", contactos);
router.get("/contacto/:id", getByID);

router.post(
  "/contacto",
  authRequired,
  isAdmin,
  uploadTemp.any(),
  validateSchema(contactoShema),
  create
);

router.put(
  "/contacto/:id",
  authRequired,
  isAdmin,
  uploadTemp.any(),
  validateSchema(contactoShema),
  update
);

router.delete("/contacto/:id", authRequired, isAdmin, deleteContact);

export default router;
