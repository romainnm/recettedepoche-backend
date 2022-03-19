const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentification");
const {
  allRecipes,
  createRecipe,
  singleRecipe,
  updateRecipe,
  removeRecipe,
} = require("../controllers/recipes");

router.route("/").get(allRecipes).post(authMiddleware, createRecipe);
router
  .route("/:id")
  .get(singleRecipe)
  .patch(authMiddleware, updateRecipe)
  .delete(authMiddleware, removeRecipe);

module.exports = router;
