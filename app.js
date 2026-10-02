const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();

const app = express();

// Passport Config
require('./config/passport')(passport);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoStore import resolution
const MongoStore = connectMongo.default || connectMongo;

// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogDB',
      collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global user variable for EJS views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/blogs', require('./routes/blogRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));