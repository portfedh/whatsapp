// Environment variables
// =====================

// Express
// =======
// Import express
const express = require("express");
const app = express();
// Set template engine to EJS: // Check
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
// app.use(express.static("public"));
// Enable reading JSON data: // Needed
app.use(express.json());
// Enable reading from html elements: // Check
app.use(express.urlencoded({ extended: true }));

// Routes:
// =======
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

// Server Port
// ===========
app.listen(process.env.PORT || 3131, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
