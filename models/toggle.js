const mongoose = require('mongoose');

module.exports = mongoose.model(
	'toggle',
	mongoose.Schema({
		commands: Array,
		lastUpdated: { type: Date, default: new Date() }
	})
);
