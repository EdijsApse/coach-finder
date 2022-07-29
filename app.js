const express = require('express');
const database = require('./database/connection');
const app = express()
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');;

app.use(express.static('public'));

app.use(webRoutes);
app.use('/api', apiRoutes);

database.connectToDatabase().then(() => {
	app.listen(3000);
});