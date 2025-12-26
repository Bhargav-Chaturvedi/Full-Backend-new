const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const conncectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

conncectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// app.use - middleware
app.use(express.json());
app.use(require("cors")()); // Allow all origins for dev
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get('/', (req, res) => {
  res.send('Contact Manager API is running');
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
