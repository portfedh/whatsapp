// Express
// =======
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
