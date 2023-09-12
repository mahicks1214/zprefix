const express = require('express');
const app = express();
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

