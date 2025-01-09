// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://ceptwlzghgoadfrxghxx.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHR3bHpnaGdvYWRmcnhnaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMjEwMzMsImV4cCI6MjA0MzU5NzAzM30.Qa2URgnFbO-nyFPa3zkjbbCdbAsRTD7xfuMEF0WG8n4'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Fetch data API from 'budget_tool.currency'
app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('admin_users').select('*');
    if (error) {
      return res.status(500).json({ message: 'Error fetching data', error });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// Add data API to 'budget_tool.currency'
app.post('/api/data', async (req, res) => {
  const { currency_code, currency_name, exchange_rate } = req.body; // Example fields, adjust based on your schema

  try {
    const { data, error } = await supabase
      .from('budget_tool.currency') // Using the correct schema and table
      .insert([{ currency_code, currency_name, exchange_rate }]); // Adjust field names accordingly

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
