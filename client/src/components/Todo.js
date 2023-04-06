import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdEditDocument, MdSend, MdSave } from "react-icons/md";
import { toast } from "react-toastify";

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [todoData, setTodoData] = useState({ text: "", isEditable: false });
	const [textTodo, setTextTodo] = useState({ text: "" });

	const token = localStorage.getItem("auth");

	const handleChange = e => {
		const { name, value } = e.target;
		setTodoData(prevTodoData => {
			return { ...prevTodoData, [name]: value };
		});
	};

	const getTodo = async () => {
		try {
			const res = await axios.get("http://localhost:5000/todo/getTodos", {
				headers: {
					authorization: `Bearer ${JSON.parse(token).AccessToken}`,
				},
			});
			console.log(res);
			setTodos(res?.data);
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};
	console.log(todoData);
	console.log(textTodo);
	useEffect(() => {
		getTodo();
	}, []);

	const postTodo = async () => {
		try {
			const res = await axios.post("http://localhost:5000/todo/createTodo", todoData, {
				headers: {
					authorization: `Bearer ${JSON.parse(token).AccessToken}`,
				},
			});
			console.log(res?.data);
			setTodos(prevTodos => {
				return [...prevTodos, res.data];
			});
			setTodoData(prevTodoData => {
				return { ...prevTodoData, text: "" };
			});
			toast("ToDo created successfully", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};

	const updateTodoEditable = async (id, textTodo) => {
		try {
			// const res = await axios.patch(`http://localhost:5000/todo/updateIsEditable/${id}`, todoData, {
			// 	headers: {
			// 		authorization: `Bearer ${JSON.parse(token).AccessToken}`,
			// 	},
			// });
			// console.log(res);
			setTodos(prevTodos =>
				prevTodos.map(todoItem => (todoItem._id === id ? { ...todoItem, isEditable: !todoItem.isEditable } : { ...todoItem, isEditable: false }))
			);
			setTextTodo(prevTextTodo => {
				return { ...prevTextTodo, text: textTodo };
			});
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};

	const saveTodoEditable = async id => {
		try {
			const res = await axios.patch(`http://localhost:5000/todo/updateTodo/${id}`, textTodo, {
				headers: {
					authorization: `Bearer ${JSON.parse(token).AccessToken}`,
				},
			});
			console.log(res);
			setTodos(prevTodos =>
				prevTodos.map(todoItem => (todoItem._id === id ? { ...todoItem, text: textTodo.text, isEditable: res.data.isEditable } : todoItem))
			);
			toast("ToDo saved successfully", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};

	const deleteTodo = async id => {
		try {
			const res = await axios.delete(`http://localhost:5000/todo/deleteTodo/${id}`, {
				headers: {
					authorization: `Bearer ${JSON.parse(token).AccessToken}`,
				},
			});
			console.log(res);
			setTodos(prevTodos => prevTodos.filter(todoItem => todoItem._id !== id));
			toast("ToDo deleted successfully", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};

	return (
		<div className="w-full   min-h-screen   selection:bg-black selection:text-blue-50 ">
			<div className="w-full h-[400px] flex justify-center items-center flex-col">
				<div className=" h-48 max-h-48 min-h-[50%] relative">
					<MdSend onClick={postTodo} className="absolute w-8 h-8 bottom-8 right-4 cursor-pointer" />
					<textarea
						rows="5"
						maxLength="201"
						className=" rounded-2xl focus:outline-none p-4 text-xl resize-none  min-w-[35vw]    max-h-48 min-h-[10] overflow-y-auto"
						type="text"
						placeholder="Write something..."
						value={todoData.text}
						name="text"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="max-[1000px]:justify-center max-[420px]:ml-0 w-full min-h-[50%]  pl-16  p-12 flex justify-start items-center  flex-wrap gap-20 ">
				{todos.map((todo, key) => (
					<div key={key} className="w-72 h-60 break-words float-none rounded-2xl bg-neutral-50   py-8 px-4 relative ">
						<img className="w-8 h-8 pointer-events-none absolute left-2 top-1" src="assets/014.png" alt="note_img" />
						{todo.isEditable ? (
							<textarea
								value={textTodo.text}
								onChange={e =>
									setTextTodo(prevTextTodo => {
										return { ...prevTextTodo, text: e.target.value };
									})
								}
								className="focus:outline-none break-words w-full h-[90%] resize-none"
								type="text"
							/>
						) : (
							<div className="break-words w-full h-full ">{todo.text}</div>
						)}
						<MdDelete onClick={() => deleteTodo(todo._id)} className="w-8 h-8 absolute right-3 bottom-4 cursor-pointer" />
						{!todo.isEditable ? (
							<MdEditDocument
								onClick={() => updateTodoEditable(todo._id, todo.text)}
								className="w-8 h-8 absolute right-12 bottom-4 cursor-pointer"
							/>
						) : (
							<MdSave onClick={() => saveTodoEditable(todo._id)} className="w-8 h-8 absolute right-12 bottom-4 cursor-pointer" />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Todo;
