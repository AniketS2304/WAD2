const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://data1aniketsuryavanshi2304:aniket123@cluster0.rjd8pks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'));

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
