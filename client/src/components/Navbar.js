import React, { useState, useEffect } from "react";
import { MdNightlight, MdLightMode } from "react-icons/md";
import { logout } from "../features/userSlice";
import { switchMode } from "../features/modeSlice";
import { useDispatch, useSelector } from "react-redux";
import useToken from "../hooks/useToken";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
	//const [token] = useToken();
	const [drop, setDrop] = useState(false);
	const [avatar, setAvatar] = useState("");

	const token = JSON.parse(localStorage.getItem("auth"));

	console.log(token?.user?.email);
	const darkMode = useSelector(state => state.mode.dark_mode);
	const dispatch = useDispatch();
	const mode_ = JSON.parse(localStorage.getItem("mode"));

	const getAvatar = async () => {
		try {
			const res = await axios.get("http://localhost:5000/auth/avatar", {
				headers: {
					authorization: `Bearer ${token?.AccessToken}`,
				},
			});
			setAvatar(res?.data?.avatar);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAvatar();
	}, []);
	return (
		<div className={"w-full z-10  fixed h-20 flex justify-center items-center shadow-xl " + (mode_?.mode === "dark" ? `bg-[#000000] ` : " bg-[#ffffff] ")}>
			{mode_?.mode === "dark" ? (
				<MdLightMode onClick={() => dispatch(switchMode("light"))} className="text-white w-12 h-12 cursor-pointer absolute left-10" />
			) : (
				<MdNightlight onClick={() => dispatch(switchMode("dark"))} className="text-black w-12 h-12 cursor-pointer absolute left-10" />
			)}
			<img className="pointer-events-none w-12 h-12 ml-8" src="assets/024.png" alt="icon_brand" />

			<img
				type="button"
				className="w-16 h-16 rounded-full cursor-pointer absolute top-2 right-4"
				src={avatar === "" ? "assets/026.png" : `http://localhost:5000/avatars/uploads/${avatar}`}
				alt="User"
				onClick={() => setDrop(!drop)}
			/>

			<div
				id="userDropdown"
				className={
					"absolute top-12 right-10 h-[58] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 " +
					(!drop ? "hidden" : null)
				}
			>
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div>{token?.user?.username}</div>
					<div className="font-medium truncate">{token?.user?.email}</div>
				</div>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
					<NavLink
						onClick={() => setDrop(!drop)}
						to="/home"
						className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					>
						Home
					</NavLink>
					<NavLink
						onClick={() => setDrop(!drop)}
						to="/settings"
						className={
							"cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						}
					>
						Settings
					</NavLink>
					<NavLink
						onClick={() => setDrop(!drop)}
						to="/licence"
						className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					>
						License
					</NavLink>
				</ul>
				<div className="py-1">
					<li
						onClick={() => {
							setDrop(!drop);
							window.location.href = "/auth";
							dispatch(logout());
						}}
						className="cursor-pointer 	block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					>
						Sign out
					</li>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
