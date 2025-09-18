import express from "express";

import { validate } from "../middlewares/validate";
import ctrl from "../controllers/users";
import { authenticate } from "../middlewares/authenticate";
import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema";

const router = express.Router();

router.get("/", ctrl.getAllUsers);

router.get("/:id", ctrl.getUserById);

router.get("/email/:email", ctrl.getUserByEmail);

router.post("/", validate(userCreateSchema), ctrl.createUser);

router.put("/:id", validate(userUpdateSchema), ctrl.updateUser);

router.delete("/:id", ctrl.deleteUser);

export default router;
