const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://jiayiwang2026:<Wjy20031211>@subletmatcher.6a4spgf.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Define Listing Schema
const listingSchema = new mongoose.Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  room_type: { type: String, required: true },
  private_bathroom: { type: String, required: true },
  roommates_count: String,
  monthly_rent: { type: Number, required: true },
  walking_distance: String,
  location: String,
  property_description: { type: String, required: true },
  contact_name: { type: String, required: true },
  wechat_id: { type: String, required: true },
  phone_number: String,
  email_address: String,
  created_at: { type: Date, default: Date.now }
});

const Listing = mongoose.model('Listing', listingSchema);

// API Routes
app.post('/api/listings', async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    console.error('Error saving listing:', error);
    res.status(400).json({ error: error.message });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
