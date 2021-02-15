const { db, User } = require("../db");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.send({ message: "User was registered!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const oneUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!oneUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const passwordWorks = await oneUser.correctPassword(req.body.password);
    if (!passwordWorks) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: oneUser.id }, secret, {
      expiresIn: 86400,
    });
    res.status(200).send({
      id: oneUser.id,
      email: oneUser.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
