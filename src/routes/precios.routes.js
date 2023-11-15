import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { preciosShema } from "../validators/precios.shema.js";
import { upload, uploadMemo } from "../libs/upload.js";
import {
  createPrecio,
  deletePrecio,
  getPrecioByID,
  precios,
  updatePrecio,
} from "../controllers/precios.controller.js";

//********************************************************************************/

const router = Router();

router.get("/precios", precios);

router.get("/precios/:id", getPrecioByID);

router.post(
  "/precios",
  authRequired,
  isAdmin,
  upload.any(),
  validateSchema(preciosShema),
  createPrecio
);

router.put(
  "/precios/:id",
  authRequired,
  isAdmin,
  upload.any(),
  validateSchema(preciosShema),
  updatePrecio
);

router.delete("/precios/:id", authRequired, isAdmin, deletePrecio);

export default router;
