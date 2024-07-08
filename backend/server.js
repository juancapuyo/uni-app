const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5444;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://juancapuyo7:Caitlin2007%40@juancluster.kethq2p.mongodb.net/UniDB?retryWrites=true&w=majority&appName=JuanCluster";

mongoose.connect(uri, {
  }).then(() => {
    console.log('MongoDB database connection established successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Schema and Model
const universitySchema = new mongoose.Schema({
  name: String,
  country: String,
  'state-province': String,
  web_pages: [String]
});

const University = mongoose.model('University', universitySchema);

// RESTful API endpoint
app.get('/universities', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
