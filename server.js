require("dotenv").config();
// Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const recipeRouter = require("./routes/recipes");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(express.json());
// If rate limiter under heroku, add
app.set("trust proxy", 1);
// Invoke the security packages
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Recette en Poche</h1><a href='/api-docs'>Documentation</a>");
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/admin", adminRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
