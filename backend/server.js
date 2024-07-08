const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8444;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;

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

// Create a new university
app.post('/universities', async (req, res) => {
    const university = new University(req.body);
    try {
        const savedUniversity = await university.save();
        res.status(201).json(savedUniversity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
  
// Update a university by ID
app.put('/universities/:id', async (req, res) => {
    try {
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUniversity) return res.status(404).json({ message: 'University not found' });
        res.json(updatedUniversity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
  
// Delete a university by ID
 app.delete('/universities/:id', async (req, res) => {
    try {
        const deletedUniversity = await University.findByIdAndDelete(req.params.id);
        if (!deletedUniversity) return res.status(404).json({ message: 'University not found' });
        res.json({ message: 'University deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
