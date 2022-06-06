const router = require("express").Router();

const materialController = require("../controllers/materialController");

router.get("/", materialController.getAll);
router.get("/:material_id", materialController.getById);

router.post("/", materialController.create);

router.put("/", materialController.update);

router.delete("/:material_id", materialController.destroy);

module.exports = router;
