const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = 8081;
const knex = require('knex')(require('../knexfile.js')["development"])
const jwt = require('jsonwebtoken');
app.use(express.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Enable Knex query logging
knex.on('query', (queryData) => {
  console.log('SQL Query:', queryData);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json('Unauthorized: Token missing or invalid');
  }

  const token = authHeader.split(' ')[1];
  const secretKey = 'mphi8990';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json('Unauthorized: Invalid token');
    }

    // Token is valid, you can access the user's data in `decoded.username`    
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  });

}

//DEFAULT PAGE
app.get('/', (req, res) => {
  res.send('Application running, Please Use an Endpoint For API discovery')
})


// GET User Profile by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('user_profile')
    .where('id', id)
    .select('*')
    .then(data => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

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
    const { first_name, last_name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Store user information in the database
    await knex('user_profile').insert({ first_name, last_name, username, password: hashedPassword });
    res.status(201).json('User registered successfully.');
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check username and password
    const user = await knex('user_profile').where({ username }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json('Authentication failed.');
    }

    // Generate a JWT token
    const secretKey = 'mphi8990';
    const token = jwt.sign({userId: user.id, username: user.username}, secretKey, { expiresIn: '6h' });

    console.log('Token sent as a response:', token);

    // Send the token as a response
    res.status(200).json({ authToken: token });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Got it to pass the postman test
app.get('/profile', verifyToken, (req, res) => {
  knex('user_profile')
    .where('username', req.username)
    .first()
    .then(userData => {
      if (!userData) {
        return res.status(404).json('User data not found');
      }
      console.log('User data:', userData);
      res.json(userData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      res.status(500).json('Error fetching user data');
    });
});



// THIS WORKS!! 
// app.get('/profile', verifyToken, (req, res) => {
// knex('user_profile')
// console.log('userID', req.userId)
// console.log('username',req.username)
// .where('username', 'ehickson18')
// .first()
// .then(userData => {
// if (!userData) {
// return res.status(404).json('User data not found');
// }
// console.log('User data:', userData);
// res.json(userData);
// })
// .catch(error => {
// console.error('Error fetching user data:', error);
// res.status(500).json('Error fetching user data');
// });
// });

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