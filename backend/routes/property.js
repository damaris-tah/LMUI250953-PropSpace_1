const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const propertyController = require("../controllers/propertyController");

// Public feed
router.get("/", propertyController.getProperties);

// Private feed
router.get("/my", authMiddleware, propertyController.getMyProperties);

// Create property
router.post("/", authMiddleware, propertyController.createProperty);

// Update property
router.put("/:id", authMiddleware, propertyController.updateProperty);

// Delete property
router.delete("/:id", authMiddleware, propertyController.deleteProperty);

module.exports = router;
