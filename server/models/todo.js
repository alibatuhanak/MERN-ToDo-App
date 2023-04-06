const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	user: {
		type: String,
	},
	text: {
		type: String,
	},
	isEditable: {
		type: Boolean,
	},
	date: {
		type: Date,
		default: () => Date.now(),
	},
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
