// API to get and post data between supabase - holiday budget tool 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Fetch data API from 'budget_tool.appuser'
app.get('/api/budget_tool/appuser', async (req, res) => {
  try {
    const { data, error } = await supabase.schema("budget_tool").from('appuser').select('*');
    if (error) {
      return res.status(500).json({ message: 'Error fetching data', error });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// Add data API to 'budget_tool.appuser'
app.post('/api/budget_tool/appuser', async (req, res) => {
  const { iduser, username } = req.body;

  try {
    const { data, error } = await supabase
      .schema("budget_tool")
      .from('appuser') // Using the correct schema and table
      .insert([{ iduser, username }]);

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
