const passport = require("../passport");
const User = require("../model/userModel");

async function register(req, res) {
  console.log(req.body);
  const user = await User.exists({ email: req.body.email });
  if (!user) {
    await User.register(
      { email: req.body.email },
      req.body.password,
      (err) => {
        if (!err) {
          passport.authenticate("local")(req, res, () => {
            res.sendStatus(201);
          });
        } else {
          console.log(err);
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(409);
  }
}

async function login(req, res) {
  const userExists = await User.exists({ email: req.body.email });
  if (userExists) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    req.login(user, (err) => {
      if (!err) {
        passport.authenticate("local")(req, res, () => {
          res.sendStatus(200)
        });
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401)
  }
}

module.exports = { register, login };
