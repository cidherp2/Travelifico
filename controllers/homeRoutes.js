const router = require("express").Router();
const { User } = require("../models");
const express = require("express");
const session = require("express-session");
const withAuth = require("../utils/auth");
//const app = express();
router.get("/create-account", (req, res) => {
  res.render("create-account");
});
//profile
router.get("/profile", (req, res) => {
  res.render("profile");
});
// HomeRoute
router.get("/homepage", (req, res) => {
  res.render("homepage");
});

//yelp
router.get("/", (req, res) => {
  console.log(req.yelpinfo);
  res.render("login"); // Adjust the path to your HTML file
});

//with auth all users
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["email", "ASC"]],
    });
    const users = userData.map((project) => project.get({ plain: true }));
    res.render("/", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});

//CREATE NEW USER
router.post("/create-account", async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    await User.create({
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });
    res.redirect("/profile");
  } catch (error) {
    console.error("Account creation failed:", error);
    res.status(500).send("Account creation failed. Please try again.");
  }
});


//LOGIN
router.post("/login", async (req, res) => {
  const userpswd = req.body.password;
  const useremail = req.body.email;
  try {
    const user = await User.findOne({ where: { email: useremail } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email . Please try again!" });
    }
    const isPassValid = await user.comparePassword(userpswd);
    if (!isPassValid) {
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again!" });
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.render('homepage');
      res.redirect('homepage');
      // res.status(200).json({ user: user, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json(error);
  }
});

//  app.post('login', async (req, res) => {
//   const isAuthenticated = await authenticateUser(req.body.email, req.body.password);
//   if (isAuthenticated) {
//     res.redirect('/create-account'); // Redirect to home page
//   } else {
//     res.render('login', { errorMessage: 'Invalid email or password' });
//   }
// });

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("profile");
});

module.exports = router;
