// index.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-database-url' with your actual database URL)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for JSON parsing
app.use(express.json());

// Passport initialization
app.use(passport.initialize());

// User model (replace with your actual User model)
const User = mongoose.model('User', new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: String,
}));

// Set up Passport Local Strategy for username/password login
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }
  
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid username or password' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));



// Create a new user
app.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword, email });
        
        // Save the user to the database
        await newUser.save();
    
        res.json({ message: 'Registration successful', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  
  //login user
  // Login route
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Passwords match, generate a token and send it in the response
        const token = jwt.sign({ id: user._id, username: user.username }, 'mkd#123', { expiresIn: '1h' });
        res.json({ token });
      } else {
        // Passwords do not match
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get a user by ID
  app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Update a user by ID
  app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Delete a user by ID
  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
