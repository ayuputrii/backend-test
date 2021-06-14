const User = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.json(newUser);
    } catch (err) {
      console.log(err.message);
      res.status.send(500).send("server error");
    }
  },
};
