const router = require("express").Router();
let User = require("../models/user.model"); // mongoose model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//handles incoming http get request on /users path
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

// handles the post request on /add path or

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 5);
  const email = req.body.email;

  const newUser = new User({ username, password: password, email: email });
  newUser
    .save()
    .then(() => res.json("User Created."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete data with param id
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//udpate data with param id
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      (user.username = req.body.username),
        (user.email = req.body.email),
        (user.password = req.body.password),
        user
          .save()
          .then((user) => res.json("Users updated."))
          .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//get login information
router.route("/:email/:password").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then(async (user) => {
      const match = await bcrypt.compareSync(
        req.params.password,
        user.password
      );
      console.log(user.password);
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          process.env.JWT_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        user
          .save()
          .then(() =>
            res.json({
              message: "Login successful.",
              token: token,
              email: user.email,
              id: user._id,
            })
          )
          .catch((err) => res.status(400).json("Error: " + user));
      } else {
        res.status(400).json("Wrong Email or password:");
        res.end();
      }
    })
    .catch((err) => res.status(400).json("Error:" + user));
});

module.exports = router;
