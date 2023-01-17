const router = require("express").Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const namecheck = await User.findOne({ username: req.body.username });
    namecheck && res.status(404).json("user Found");

    const emailcheck = await User.findOne({ email: req.body.email });
    emailcheck && res.status(404).json("email Found");

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    !user && res.status(404).json("user not found or Password not match");

    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
