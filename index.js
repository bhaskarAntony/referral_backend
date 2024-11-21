const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');


// Load environment variables
dotenv.config();

// Initialize app and server
const app = express();
app.use(session({
    secret: 'ba38c15e6676480b311ffb5e8a63d0bb05796f688952fac7e4676a5937b6ccfa13c1dbaea6db2cb9f91c7a3e06ec930b41381d457769343da9a2ce4ca0ef463e', // Secret key to sign session cookie
    resave: false,
    saveUninitialized: true,    // Save uninitialized sessions
    cookie: { secure: false }   // Use secure: true if using HTTPS in production
  }));

app.use(cookieParser());
// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api', require('./routes/support'));
app.use('/api', require('./routes/addFriend'));
app.use('/api', require('./routes/callback'));
app.use('/api', require('./routes/callback'));
app.use('/api', require('./routes/refferal'));
app.use('/api', require('./routes/referredUser'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/driver', require('./routes/driverRoutes'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

