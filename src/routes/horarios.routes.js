import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { horariosShema } from "../validators/horarios.shema.js";
import { upload, uploadMemo } from "../libs/upload.js";
import {
  createHorario,
  deleteHorario,
  getHorarioByID,
  horarios,
  updateHorario,
} from "../controllers/horarios.controller.js";

//********************************************************************************/

const router = Router();

router.get("/horarios", horarios);
router.get("/horarios/:id", getHorarioByID);

router.post(
  "/horarios",
  authRequired,
  isAdmin,
  upload.any(),
  validateSchema(horariosShema),
  createHorario
);

router.put(
  "/horarios/:id",
  authRequired,
  isAdmin,
  upload.any(),
  validateSchema(horariosShema),
  updateHorario
);

router.delete("/horarios/:id", authRequired, isAdmin, deleteHorario);

export default router;
