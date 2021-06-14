const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoute = require("./src/routes");

// Router
app.use("/api/v1/user", userRoute);

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
