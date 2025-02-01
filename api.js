// API to get and post data between supabase - holiday budget tool 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');



// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
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

// Fetch data API from 'budget_tool.budget'
app.get('/api/budget_tool/budget', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('budget').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.budget_history'
app.get('/api/budget_tool/budget_history', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('budgethistory').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.charitable'
app.get('/api/budget_tool/charitable', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('charitable').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.clothing'
app.get('/api/budget_tool/clothing', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('clothing').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.currency'
app.get('/api/budget_tool/currency', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('currency').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.decoration'
app.get('/api/budget_tool/decoration', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('decoration').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.entertainment'
app.get('/api/budget_tool/entertainment', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('entertainment').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.festivals'
app.get('/api/budget_tool/festivals', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('festivals').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.food&drinks'
app.get('/api/budget_tool/food&drinks', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('food&drinks').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.gifts'
app.get('/api/budget_tool/gifts', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('gifts').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.stationery'
app.get('/api/budget_tool/stationery', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('stationery').select('*');
      if (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
});

// Fetch data API from 'budget_tool.travel'
app.get('/api/budget_tool/travel', async (req, res) => {
    try {
      const { data, error } = await supabase.schema("budget_tool").from('travel').select('*');
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

// Add data API to 'budget_tool.charitable'
app.post('/api/budget_tool/charitable', async (req, res) => {
    const { charitableid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('charitable') // Using the correct schema and table
        .insert([{ charitableid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.clothing'
app.post('/api/budget_tool/clothing', async (req, res) => {
    const { clothingid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('clothing') // Using the correct schema and table
        .insert([{ clothingid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.decoration'
app.post('/api/budget_tool/decoration', async (req, res) => {
    const { decorationid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('decoration') // Using the correct schema and table
        .insert([{ decorationid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.entertainment'
app.post('/api/budget_tool/entertainment', async (req, res) => {
    const { entertainmentid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('entertainment') // Using the correct schema and table
        .insert([{ entertainmentid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.food&drinks'
app.post('/api/budget_tool/foodNdrinks', async (req, res) => {
    const { foodNdrinks, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('food&drinks') // Using the correct schema and table
        .insert([{ foodNdrinks, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.gifts'
app.post('/api/budget_tool/gifts', async (req, res) => {
    const { giftsid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('gifts') // Using the correct schema and table
        .insert([{ giftsid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.stationery'
app.post('/api/budget_tool/stationery', async (req, res) => {
    const { stationeryid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('stationery') // Using the correct schema and table
        .insert([{ stationeryid, name, cost, iduser }]);
  
      if (error) {
        return res.status(500).json({ message: 'Error adding data', error });
      }
  
      res.status(201).json({ message: 'Data added successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Error adding data', error: err.message });
    }
});

// Add data API to 'budget_tool.travel'
app.post('/api/budget_tool/travel', async (req, res) => {
    const { travelid, name, cost, iduser } = req.body;
  
    try {
      const { data, error } = await supabase
        .schema("budget_tool")
        .from('travel') // Using the correct schema and table
        .insert([{ travelid, name, cost, iduser }]);
  
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
