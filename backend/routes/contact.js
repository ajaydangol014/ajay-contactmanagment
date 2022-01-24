const router = require("express").Router();
let Contact = require("../models/contact.model"); // mongoose model

//handles incoming http get request on /contacts path
router.route("/").get((req, res) => {
  Contact.find()
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error:" + err));
});

//create a new contact
router.route("/add").post((req, res) => {
  const fullname = req.body.fullname;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const image = req.body.image;
  const contactid = req.body.contactid;

  const newContact = new Contact({
    fullname,
    phonenumber,
    email,
    image,
    contactid,
  });
  newContact
    .save()
    .then(() => res.json("Contact Created."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get contacts by Id
router.route("/get/:id").get((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get data with param id
router.route("/:id").get((req, res) => {
  Contact.find()
    .where("contactid")
    .equals(req.params.id)
    .sort({ fullname: "asc" })
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get data with param id
router.route("/view/:id").get((req, res) => {
  Contact.find()
    .where("_id")
    .equals(req.params.id)
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete data with param id
router.route("/delete/:id").delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json("Contact Deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//udpate data with param id
router.route("/update/:id").post((req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      (contact.fullname = req.body.fullname),
        (contact.phonenumber = req.body.phonenumber),
        (contact.email = req.body.email),
        (contact.image = req.body.image),
        contact
          .save()
          .then((contact) => res.json("Contact updated."))
          .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//udpate favorite data with param id
router.route("/favorite/:id/:fav").get((req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    const fav = req.params.fav;
    if (fav == "true") {
      contact.favorite = false;
    } else {
      contact.favorite = true;
    }
    contact
      .save()
      .then(() => res.json(contact.favorite))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
