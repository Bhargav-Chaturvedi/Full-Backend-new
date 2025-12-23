const asyncHandler = require("express-async-handler");
// @desc Get all contact
// @routes GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ Message: "Get all contacts" });
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
  res.status(201).json({ Message: " Creare contact" });
});

// @desc Get  contact
// @routes GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ Message: `Get contact for ${req.params.id}` });
});

// @desc Update contact
// @routes POST /api/contacts:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ Message: `Update contact for ${req.params.id}` });
});
// @desc Delete contact
// @routes DELETE /api/contacts:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(201).json({ Message: `Delete contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
