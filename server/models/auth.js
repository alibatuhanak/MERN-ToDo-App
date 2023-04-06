const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	username: {
		type: String,
		require: true,
		trim: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: () => Date.now(),
	},
});

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
