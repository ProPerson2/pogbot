const mongoose = require('mongoose');

module.exports = mongoose.model(
	'premium',
	mongoose.Schema({
		userID: String,
		guildID: String,
		premium: Boolean,
		lastUpdated: { type: Date, default: new Date() }
	})
);
