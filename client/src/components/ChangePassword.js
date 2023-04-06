import React, { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const ChangePassword = () => {
	const [token] = useToken();
	const [data, setData] = useState({ email: "", current_password: "", password1: "", password2: "" });
	const [controlForNew, setControlForNew] = useState(false);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prevData => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const handleClick = async e => {
		try {
			e.preventDefault();
			const res = await axios.patch("http://localhost:5000/auth/changePassword", data, {
				headers: {
					authorization: `Bearer ${token.AccessToken}`,
				},
			});
			setData({ email: "", current_password: "", password1: "", password2: "" });
			setControlForNew(true);
			toast(res.data.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
				icon: "👍",
			});
			toast("You must re-login", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
				delay: 2000,
				icon: "🤐",
			});

			console.log(res);
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
				delay: 2000,
				icon: "🐵",
			});

			console.log(error?.response?.data?.msg);
		}
	};

	console.log(data);

	useEffect(() => {
		if (controlForNew) {
			setTimeout(() => {
				dispatch(logout());
				window.location.href = "/";
			}, 3800);
		}
	}, [controlForNew]);

	return (
		<div className="max-[1000px]:mb-[70px] max-[1000px]:w-[40vw] max-[480px]:w-[70vw] max-[1000px]:mt-[100px] w-1/5 h-1/3  ">
			<h2 className="text-center text-lg text-red-400">Change password</h2>
			<div className=" relative z-0 w-full mb-6 group">
				<input
					type="text"
					name="email"
					id="email"
					value={data.email}
					onChange={handleChange}
					className="mt-6 block py-2.5 px-0 w-full text-lg text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#fffbd5] focus:outline-none focus:ring-0 focus:border-[#fffbd5] peer"
					placeholder=" "
					required
				/>
				<label
					htmlFor="email"
					className="peer-focus:font-medium absolute text-m text-red-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-focus:dark:text-[#fffbd5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Email address
				</label>
			</div>
			<div className="relative z-0 w-full mb-6 group">
				<input
					type="password"
					name="current_password"
					id="current_password"
					value={data.current_password}
					onChange={handleChange}
					className="mt-6 block py-2.5 px-0 w-full text-lg text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#fffbd5] focus:outline-none focus:ring-0 focus:border-[#fffbd5] peer"
					placeholder=" "
					required
				/>
				<label
					htmlFor="current_password"
					className="peer-focus:font-medium absolute text-m text-red-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-focus:dark:text-[#fffbd5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Current Password
				</label>
			</div>
			<div className="relative z-0 w-full mb-6 group">
				<input
					type="password"
					name="password1"
					id="password1"
					value={data.password1}
					onChange={handleChange}
					className="mt-6 block py-2.5 px-0 w-full text-lg text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#fffbd5] focus:outline-none focus:ring-0 focus:border-[#fffbd5] peer"
					placeholder=" "
					required
				/>
				<label
					htmlFor="password1"
					className="peer-focus:font-medium absolute text-m text-red-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-focus:dark:text-[#fffbd5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					New Password
				</label>
			</div>
			<div className="relative z-0 w-full mb-6 group">
				<input
					type="password"
					name="password2"
					id="password2"
					value={data.password2}
					onChange={handleChange}
					className="mt-6 block py-2.5 px-0 w-full text-lg text-red-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#fffbd5] focus:outline-none focus:ring-0 focus:border-[#fffbd5] peer"
					placeholder=" "
					required
				/>
				<label
					htmlFor="password2"
					className="peer-focus:font-medium absolute text-m text-red-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-focus:dark:text-[#fffbd5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Confirm New Password
				</label>
			</div>
			<button onClick={handleClick} className="w-full h-12  rounded-2xl text-lg bg-slate-800 text-[#fffbd5]">
				Change Password
			</button>
		</div>
	);
};

export default ChangePassword;
