const express = require('express');
// NOTE recordRoutes is an instance of the express router.
// NOTE we use it to define our routes.
// NOTE the router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
// NOTE this will help us connect to the database
const dbo = require('../db/conn');
// NOTE this help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// ANCHOR this section will help you get a list of all the records.
recordRoutes.route('/record').get(function (req, res) {
	let dbConnect = dbo.getDb('employees');

	dbConnect
		.collection('records')
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// ANCHOR this section will help you get a single record by id
recordRoutes.route('/record/:id').get(function (req, res) {
	let dbConnect = dbo.getDb();
	let myQuery = { _id: ObjectId(req.params.id) };

	dbConnect.collection('records').findOne(myQuery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// ANCHOR this section will help you create a new record.
recordRoutes.route('/record/add').post(function (req, res) {
	let dbConnect = dbo.getDb();
	let myObj = {
		name: req.body.name,
		position: req.body.position,
		level: req.body.level,
	};

	dbConnect.collection('records').insertOne(myObj, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// ANCHOR this section will help you update a record by id.
recordRoutes.route('/update/:id').post(function (req, res) {
	let dbConnect = dbo.getDb();
	let myQuery = { _id: ObjectId(req.params.id) };
	let newValues = {
		$set: {
			name: req.body.name,
			position: req.body.position,
			level: req.body.level,
		},
	};

	dbConnect
		.collection('records')
		.updateOne(myQuery, newValues, function (err, result) {
			if (err) throw err;

			console.log('1 document updated');

			res.json(result);
		});
});

// ANCHOR this section will help you delete a record
recordRoutes.route('/:id').delete((req, res) => {
	let dbConnect = dbo.getDb();
	let myQuery = { _id: ObjectId(req.params.id) };

	dbConnect.collection('records').deleteOne(myQuery, function (err, result) {
		if (err) throw err;

		console.log('1 document deleted');

		res.json(result);
	});
});

module.exports = recordRoutes;
