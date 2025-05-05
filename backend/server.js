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
// API Routes
app.use('/api/users', authRoutes); // Login & Signup routes
app.post("/analyze", analyzeWebsiteHandler); // POST route for website analysis

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Fallback to index.html for client-side routing
app.get('/:*/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
