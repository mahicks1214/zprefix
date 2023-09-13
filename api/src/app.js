const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = 8081;
const knex = require('knex')(require('../knexfile.js')["development"])

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(express.json());



//DEFAULT PAGE
app.get('/', (req, res) => {
    res.send('Application running, Please Use an Endpoint For API discovery')
})

//GET User Profile PAGE 
app.get('/users', (req, res) => {
    knex('user_profile')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
})

// POST User Profiles
app.post('/users', async (req, res) => {
    try {
        const newUserProfile = req.body;
        await knex('user_profile').insert(newUserProfile);
        res.status(201).json('New user profile has been added.');
    } catch (err) {
        res.status(500).json(err);
    }
});

// PATCH User Profile by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserProfile = req.body;
        await knex('user_profile').where('id', id).update(updatedUserProfile);
        res.json('User profile has been updated.');
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE User Profile by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await knex('user_profile').where('id', id).del();
        res.json('User profile has been deleted.');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Register a new user
app.post('/register', async (req, res) => {
    try {
      const { first_name, last_name,username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  
      // Store user information in the database
      await knex('user_profile').insert({ first_name, last_name,username, password: hashedPassword });
      res.status(201).json('User registered successfully.');
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  
  // Login
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Retrieve user from the database
      const user = await knex('user_profile').where({ username }).first();
  
      if (!user) {
        return res.status(401).json('Authentication failed.');
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json('Authentication failed.');
      }
  
      // Create a session/token and send it back to the client
      // You can use JWT or other authentication mechanisms here
      const authToken = 'generate_your_auth_token_here';
  
      res.status(200).json({ authToken });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })

//GET Auction Inventory PAGE 
app.get('/inventory', (req, res) => {
    knex('auction_items')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
})

// GET Auction Inventory By First Letter 
app.get('/inventory/:letter', (req, res) => {
    const startingLetter = req.params.letter;
  
    knex('auction_items')
      .select('*')
      .where('item_name', 'ILIKE', `${startingLetter}%`)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  })

  // POST Auction Items
app.post('/inventory', async (req, res) => {
    try {
        const newItem = req.body;
        await knex('auction_items').insert(newItem);
        res.status(201).json('New item has been added.');
    } catch (err) {
        res.status(500).json(err);
    }
});

// PATCH Auction Item by Name
app.patch('/inventory/:itemName', async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const updatedAuctionItem = req.body;
        await knex('auction_items').where('item_name', itemName).update(updatedAuctionItem);
        res.json('Auction item has been updated.');
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE Auction Item by Name
app.delete('/inventory/:itemName', async (req, res) => {
    try {
        const itemName = req.params.itemName;
        await knex('auction_items').where('item_name', itemName).del();
        res.json('Auction item has been deleted.');
    } catch (err) {
        res.status(500).json(err);
    }
});  
  

//LISTEN PORT
app.listen(port, () => {
    console.log('Knex and Express applications running successfully')
})

