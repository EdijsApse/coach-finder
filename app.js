require('dotenv').config();

const express = require('express');
const app = express();
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');;

const mongoose = require('mongoose');

app.use(express.static('public'));

app.use(webRoutes);
app.use('/api', apiRoutes);

mongoose.connect(process.env.DB_URL)
.then(() => {
	app.listen(3000);
})
.catch(err => {
	console.log('Connection to DB not established!')
	console.log(err);
})