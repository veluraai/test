const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Velura Backend API' });
});

// Add your routes here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});