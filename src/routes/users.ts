import express from "express";
import { validate } from "../middlewares/validate";
// import orderSchema from "../../shemas/order";
import ctrl from "../controllers/users";
import { authenticate } from "../middlewares/authenticate";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSchema";

const router = express.Router();

router.get("/", ctrl.getAllUsers);

router.get("/refresh", authenticate, ctrl.refreshUser);

router.post("/register", validate(userRegisterSchema), ctrl.register);

router.post("/login", validate(userLoginSchema), ctrl.login);

router.get("/logout", ctrl.logout);

router.get("/:id", ctrl.getUserById);

export default router;
