const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.urlencoded({ extended: true }));

const user = require("./src/models");

const jwt = require("jsonwebtoken");
const pasport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "lalala";

const getUser = async (obj) => {
  return await user.findOne({
    where: obj,
  });
};

const db = require("./src/config/db");
db.authenticate().then(() => console.log("Success Database Connection"));

app.get("/", (req, res) => {
  res.send("node bisa di buka di REST API");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      let user = await getUser({ email: email });

      if (!user) {
        res.status(401).json({
          status: 401,
          msg: "email invalid or you not register!",
        });
      }
      if (user.password === password) {
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ status: 200, msg: "oke", token: token, email: email });
      } else {
        res.status(401).json({ status: 401, msg: "password invalid" });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status.send(500).send("server error");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new user({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json(newUser);
  } catch {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

app.listen(2000, () => {
  console.log(`Server started on port 2000`);
});
