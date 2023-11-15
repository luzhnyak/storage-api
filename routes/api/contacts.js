const express = require("express");
const { validateBody } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",

  validateBody(updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",

  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
