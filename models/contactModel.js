const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    Email: {
      type: String,
      required: [true, "Please add the contact email"],
    },
    Phone: {
      type: String,
      required: [true, "Please add the contact phone"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
