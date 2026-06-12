const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// routes
const authRoutes = require('./routes/authroutes');
app.use('/auth', authRoutes);
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// DB connection
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to Atlas"))
  .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});