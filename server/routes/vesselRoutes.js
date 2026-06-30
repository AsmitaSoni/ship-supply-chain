const express = require("express");

const router = express.Router();

const vesselController = require("../controllers/vesselController");

router.post("/", vesselController.createVessel);

router.get("/", vesselController.getVessels);

router.get("/:id", vesselController.getVessel);

router.put("/:id", vesselController.updateVessel);

router.delete("/:id", vesselController.deleteVessel);

module.exports = router;