const express = require("express");
const router = express.Router();
const { register } = require("../controllers/admin");
const authMiddleware = require("../middleware/authentification");
const adminMiddleware = require("../middleware/adminMiddleware");

router.route("/register").post(authMiddleware, adminMiddleware, register);

module.exports = router;
