const Recipe = require("../models/Recipe");
const userId = "622cd54402f1274ad2566d3d";

const allRecipes = async (req, res) => {
  try {
    const { sort, fields } = req.query;
    // Find + Filtering feature
    let result = Recipe.find(req.query);

    //Sorting feature
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result.sort("createdAt");
    }

    // Select fields feature
    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    } else {
      result.sort("createdAt");
    }

    const recipes = await result;
    res.status(200).json({ recipes, count: recipes.length });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const singleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({
      _id: id,
      createdBy: userId,
    });
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateRecipe = async (req, res) => {
  try {
    const {
      //body: { name, ingredients, instructions, style, duration },
      params: { id },
    } = req;
    const recipe = await Recipe.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const removeRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndDelete({ _id: id });
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  allRecipes,
  createRecipe,
  singleRecipe,
  updateRecipe,
  removeRecipe,
};
