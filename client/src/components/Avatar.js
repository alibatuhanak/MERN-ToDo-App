import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
	const [file, setFile] = useState({});
	const [path, setPath] = useState("");
	const [control, setControl] = useState(false);

	const [token] = useToken();
	const navigate = useNavigate();

	const uploadAvatar = async e => {
		try {
			e.preventDefault();
			const data = new FormData();
			data.append("avatar", file);
			console.log(data);

			const res = await axios.patch("http://localhost:5000/auth/avatar", data, {
				headers: {
					authorization: `Bearer ${token?.AccessToken}`,
				},
			});
			setPath(res.data.pathAvatar);
			toast("Your image changed successfully", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
				icon: "🤐",
			});

			console.log(res);
		} catch (error) {
			toast("File must be jpg, jpeg or png.", {
				position: "top-left",
				autoClose: 2000,
				theme: "dark",
			});
		}
	};
	const handleImage = e => {
		const image = e.target.files;
		console.log(image);
		setFile(image[0]);
		setControl(true);
	};

	useEffect(() => {
		if (path !== "") {
			setTimeout(() => {
				navigate(0);
			}, 2000);
		}
	}, [path]);

	return (
		<div id="avatar2" className="max-[480px]:w-[80vw] max-[480px]:h-[30vh]   flex justify-center items-center flex-col">
			{/* <img className="w-24 h-24 rounded-full" src={path} alt="avatar" /> */}
			{/* <img className="w-24 h-24 rounded-full" src={`http://localhost:5000/avatars/${path}`} alt="avatar" /> */}
			<label className="max-[1000px]:text-xl max-[480px]:text-sm block mb-2 text-lg font-medium text-gray-900 dark:text-white" htmlFor="file">
				Upload file for Avatar Icon
			</label>
			<input
				className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				id="file"
				type="file"
				name="file"
				onChange={handleImage}
			/>
			{control ? (
				<button onClick={uploadAvatar} className="mt-12 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 ">
					Save Changes
				</button>
			) : null}
		</div>
	);
};

export default Avatar;
