import { Router } from "express";
import { authRequired, isAdmin } from "../middleware/validateTokend.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { mailShema } from "../validators/mail.shema.js";
import { SendMail } from "../libs/mail.js";
import { upload } from "../libs/upload.js";

//********************************************************************************/

const router = Router();

router.post("/mail", upload.any(), validateSchema(mailShema), SendMail);
export default router;
