const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const Todo = require("../models/todo");

router.get("/getTodos", verifyJWT, async (req, res) => {
	try {
		const todos = await Todo.find({ user: req.user });
		res.status(200).json(todos);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ auth: false, msg: error });
	}
});

router.post("/createTodo", verifyJWT, async (req, res) => {
	try {
		const { text, isEditable } = req.body;
		const newTodo = await Todo.create({ user: req.user, text, isEditable });
		res.status(200).json(newTodo);
	} catch (error) {
		return res.status(500).json({ auth: false, msg: error });
	}
});

router.patch("/updateIsEditable/:id", verifyJWT, async (req, res) => {
	try {
		const { id } = req.params;
		const updatedIsEditable = await Todo.findByIdAndUpdate(id, { isEditable: !req.body.isEditable }, { new: true });
		res.status(200).json(updatedIsEditable);
	} catch (error) {
		return res.status(500).json({ auth: false, msg: error });
	}
});

router.patch("/updateTodo/:id", verifyJWT, async (req, res) => {
	try {
		const { id } = req.params;
		const { text } = req.body;
		console.log(text);
		const updatedTodo = await Todo.findByIdAndUpdate(id, { text, isEditable: false }, { new: true });
		res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).json({ auth: false, msg: error });
	}
});

router.delete("/deleteTodo/:id", verifyJWT, async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTodo = await Todo.findByIdAndDelete(id);
		res.status(200).json(deletedTodo);
	} catch (error) {
		return res.status(500).json({ auth: false, msg: error });
	}
});

module.exports = router;
