const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reactCrudDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Create a simple schema and model
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  description: String,
}));

// Routes for CRUD operations
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({ name, description });
  await newItem.save();
  res.json(newItem);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.put('/items/:id', async (req, res) => {
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.json(updatedItem); // Return the updated item
  });
  
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
