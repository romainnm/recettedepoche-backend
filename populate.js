require("dotenv").config();
const connectDB = require("./db/connect");
const Recipe = require("./models/Recipe");
const recipes = require("./recipes.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Recipe.deleteMany();
    await Recipe.create(recipes);
    console.log("success upload");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};
start();
