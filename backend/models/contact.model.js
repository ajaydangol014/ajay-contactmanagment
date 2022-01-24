const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    contactid: { type: String },
    favorite: { type: Boolean, default: false },
    // contactid: [{ type: Schema.Types.ObjectId, ref: "Contact" }], //creating foreign key constraint
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
