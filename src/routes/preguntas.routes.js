import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { preguntasShema } from "../validators/preguntas.shema.js";
import { uploadMemo } from "../libs/upload.js";
import {
  create,
  getByID,
  preguntas,
  update,
  deletePreg,
} from "../controllers/preguntas.controller.js";

//********************************************************************************/

const router = Router();

router.get("/preguntas", preguntas);
router.get("/preguntas/:id", getByID);

router.post(
  "/preguntas",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(preguntasShema),
  create
);

router.put(
  "/preguntas/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(preguntasShema),
  update
);

router.delete("/preguntas/:id", authRequired, isAdmin, deletePreg);

export default router;
