const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('./src/routes/authRoutes');
const basicRoutes = require('./src/routes/basicRoutes');
const hrRoutes = require('./src/routes/hrRoutes');

// Initialize app
const app = express();
const port = 3000;

// Setup our view engine
app.set('view engine', 'ejs');

// Middleware to handle json data 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware to handle static files
app.use(express.static('public'));

// Session middlewares
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false
}));

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
    if(session.id){
        var username = session.username.split("@"); 
        res.locals.username = username[0];
    }
    next();
});

// Setup Database connection
mongoose.connect('mongodb://localhost/onlinetesting',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Include routes
basicRoutes(app);
authRoutes(app);
hrRoutes(app);

// Add port to start server
app.listen(port, function(err){
    if(err)
        throw err;
    console.log('Magic happens on ' + port);
});
