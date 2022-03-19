const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    ingredients: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    instructions: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    style: {
      type: String,
      enum: ["all", "eastern", "western", "dessert", "baking", "drink", "sauce"],
      default: "all",
    },
    duration: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
