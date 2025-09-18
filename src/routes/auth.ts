import express from "express";
import { validate } from "../middlewares/validate";
import ctrl from "../controllers/auth";
import { authenticate } from "../middlewares/authenticate";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSchema";

const router = express.Router();

router.get("/refresh", authenticate, ctrl.refreshUser);

router.post("/register", validate(userRegisterSchema), ctrl.register);

router.post("/login", validate(userLoginSchema), ctrl.login);

router.get("/logout", ctrl.logout);

export default router;
