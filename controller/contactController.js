const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contact
// @routes GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Create contact
// @routes POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { Name, Email, Phone } = req.body;
  if (!Name || !Email || !Phone) {
    res.status(404);
    throw new Error("All fields are require!");
  }
  const contact = await Contact.create({
    Name,
    Email,
    Phone,
  });
  res.status(201).json(contact);
});

// @desc Get  contact
// @routes GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status = 404;
    throw new Error("Contact not fount");
  }
  res.status(200).json(contact);
});

// @desc Update contact
// @routes POST /api/contacts:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  //first fetch the contact
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status = 404;
    throw new Error("Contact not fount");
  }
  // Update now
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
// @desc Delete contact
// @routes DELETE /api/contacts:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  //first fetch the contact
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status = 404;
    throw new Error("Contact not fount");
  }
  // Delete now
  await contact.remove();
  res.status(201).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
