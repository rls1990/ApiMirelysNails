import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import {
  login,
  loginAdmin,
  logout,
  profile,
  getUsers,
  getUserById,
  getUsersByRoll,
  createUser,
  updateUser,
  deleteUser,
  getImgagePerfil,
  uploadImgCarnet,
  registerUser,
  uploadFotoPerfil,
  verifyToken,
} from "../controllers/usuario.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { loginSchema, userSchema } from "../validators/usuario.schema.js";
import { upload, uploadMemo } from "../libs/upload.js";

//********************************************************************************/

const router = Router();

router.post("/login", upload.any(), validateSchema(loginSchema), login);

router.post(
  "/loginadmin",
  upload.any(),
  validateSchema(loginSchema),
  loginAdmin
);

router.get("/verify", verifyToken);

router.post("/logout", logout);
router.get("/profile", authRequired, profile);

router.get("/usuarios", authRequired, isAdmin, getUsers);
router.get("/usuarios/:id", authRequired, isAdmin, getUserById);
router.get("/usuarios/roll/:roll", authRequired, isAdmin, getUsersByRoll);

router.post(
  "/register",
  uploadMemo.single("file"),
  validateSchema(userSchema),
  registerUser
);

router.post(
  "/usuarios",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(userSchema),
  createUser
);

router.put(
  "/usuarios/:id",
  authRequired,
  isAdmin,
  uploadMemo.single("file"),
  validateSchema(userSchema),
  updateUser
);

router.delete("/usuarios/:id", authRequired, isAdmin, deleteUser);

router.get(
  "/usuarios/imgperfil/:id/:nombre/:tipo",
  authRequired,
  getImgagePerfil
);

router.post(
  "/usuarios/imgperfil",
  authRequired,
  uploadMemo.single("file"),
  uploadFotoPerfil
);

router.post(
  "/usuarios/imgcarnet/:tipo",
  authRequired,
  uploadMemo.single("file"),
  uploadImgCarnet
);

export default router;
