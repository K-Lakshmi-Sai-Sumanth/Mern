
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.post("/register", async(req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10)

  const user = await User.create({
    email:req.body.email,
    password:hash,
    name:req.body.name
  })

  res.json(user)
})

const crypto = require("crypto");

router.post("/login", async (req, res) => {


  const user = await User.findOne({email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ token });
});
module.exports = router
