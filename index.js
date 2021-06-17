const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const userRoute = require("./src/routes");
const productRoute = require("./src/routes/product");

// Router
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

// Connect Database
const db = require("./src/config/db");
db.authenticate().then(console.log("Success DB Connection"));

// Test
app.get("/", (req, res) => {
  console.log("Test Hallo");
});

// On Port
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
