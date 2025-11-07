// Environment variables
require("dotenv").config();

// Express
// =======
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images, etc.) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Swagger setup
const setupSwagger = require("./swagger");
setupSwagger(app);

// Routes:
// =======
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

// Server Port
// ===========
const PORT = process.env.PORT || 3131;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
