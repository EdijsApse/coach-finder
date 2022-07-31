require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const { defaultErrorHandler } = require('./middlewares');
const { tokenValidationStrategy, loginStartegy, registerStrategy } = require('./passport/strategies');

app.use(express.static('public'));
app.use(express.json());

passport.use(tokenValidationStrategy);// Strategy for retrieving token from header
passport.use('login', loginStartegy); // Strategy for login
passport.use('register', registerStrategy); // Strategy for registering

app.use(webRoutes);
app.use('/api', apiRoutes);

app.use(defaultErrorHandler);

mongoose.connect(process.env.DB_URL)
.then(() => {
	app.listen(3000);
})
.catch(err => {
	console.log('Connection to DB not established!')
	console.log(err);
})