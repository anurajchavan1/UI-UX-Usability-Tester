const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const { analyzeWebsiteHandler } = require("./controllers/analysisController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/users', require('./routes/userRoutes'));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use("/", authRoutes); // handles /login and /signup
app.post("/analyze", analyzeWebsiteHandler);


app.listen(PORT, () =>
  console.log(`✅ Server running on ${PORT}`)
);
