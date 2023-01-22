const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
// NOTE const port process.env.port will access the port variable from the config.env we required.
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
// NOTE get driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
	// NOTE perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});

	console.log(`Server is running on port: ${port}`);
});
