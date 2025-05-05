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
app.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    // 1) Do your analysis, e.g. scrape the URL, compute metrics, etc.
    const analysisResult = await analyzeWebsiteHandler(url);

    // 2) Return a *real* value, not a comment
    return res.json({ result: analysisResult });
  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Analysis failed' });
  }
});


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
