const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models/index");
const User = db.User;

require("dotenv").config();

const MAX_AGE = 3 * 24 * 60 * 60; // 3 days

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: MAX_AGE,
  });
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const userPassword = user.password;
      const authPassword = await bcrypt.compare(password, userPassword);

      if (authPassword) {
        const authUser = {
          token: createToken(user.id),
          userId: user.id,
          expirationDate: MAX_AGE * 1000,
        };

        console.log("User logged in");

        return authUser;
      }

      throw Error("Incorrect password");
    }

    throw Error("Incorrect email");
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = { login };
