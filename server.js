// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'your_supabase_url'; // Replace with your Supabase URL
const supabaseKey = 'your_supabase_anon_key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Fetch data API
app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('your_table').select('*');
    if (error) {
      return res.status(500).json({ message: 'Error fetching data', error });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// Add data API
app.post('/api/data', async (req, res) => {
  const { field1, field2 } = req.body; // assuming your table has columns field1 and field2

  try {
    const { data, error } = await supabase
      .from('your_table')
      .insert([{ field1, field2 }]);

    if (error) {
      return res.status(500).json({ message: 'Error adding data', error });
    }

    res.status(201).json({ message: 'Data added successfully', data });
  } catch (err) {
    res.status(500).json({ message: 'Error adding data', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
