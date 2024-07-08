const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');
const University = require('./models/university');

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
// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
  
  // Login a user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};
  
// Protect CRUD routes with the middleware
app.post('/universities', authMiddleware, async (req, res) => {
    const university = new University(req.body);
    try {
        const savedUniversity = await university.save();
        res.status(201).json(savedUniversity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
  
app.get('/universities', async (req, res) => {
    try {
        const universities = await University.find();
         res.json(universities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
  
app.get('/universities/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.json(university);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });
  
app.put('/universities/:id', authMiddleware, async (req, res) => {
    try {
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUniversity) return res.status(404).json({ message: 'University not found' });
        res.json(updatedUniversity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
  
app.delete('/universities/:id', authMiddleware, async (req, res) => {
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
