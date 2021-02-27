const loginService = require("../services/LoginService");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, expirationDate } = await loginService.login(email, password);

    // Storing credentials and user info for convenient usage:
    res.cookie("jwt", token, { httpOnly: true, maxAge: expirationDate });
    res.cookie("user", email, { httpOnly: true, maxAge: expirationDate });

    return res.status(200).json({ message: `User ${email} logged in` });
  } catch (error) {
    return res.status(404).json({ message: "Incorrect email or password" });
  }
};

const logout = async (req, res) => {
  const user = req.cookies.user;

  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user", "", { maxAge: 1 });

  return res.status(200).json({ message: `User ${user} logged out` });
};

module.exports = { login, logout };
