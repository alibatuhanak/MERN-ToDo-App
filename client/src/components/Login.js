import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { switchMode } from "../features/modeSlice";
import useToken from "../hooks/useToken";

const Login = ({ setSignup, auth, setAuth }) => {
	const settings = {
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 3000,
		draggable: false,
		arrows: false,
	};

	const dispatch = useDispatch();
	const authData = useSelector(state => state.user.auth);
	//const [token] = useToken();
	const [controlForLogin, setControlForLogin] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		console.log(auth);
		setAuth(prevAuth => {
			return {
				...prevAuth,
				[name]: value,
			};
		});
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:5000/auth/login", auth);
			console.log(res.data);
			setControlForLogin(true);
			dispatch(login(res.data));
			toast("Successful", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			setAuth({
				email: "",
				username: "",
				password: "",
			});
			if (JSON.parse(localStorage.getItem("mode")).mode === null) {
				dispatch(switchMode("light"));
			}
		} catch (error) {
			toast(error?.response?.data?.msg, {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error?.response?.data?.msg);
		}
	};
	useEffect(() => {
		if (controlForLogin) {
			setTimeout(() => {
				console.log(authData);
				window.location.href = "/home";
			}, 1500);
		}
	}, [controlForLogin, authData]);
	return (
		<>
			<div className="h-full w-1/2 flex justify-center items-center flex-col">
				<div className="relative z-0 w-4/5 mb-6 group">
					<input
						type="text"
						name="email"
						id="email"
						onChange={handleChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Email address
					</label>
				</div>

				<div className="relative z-0 w-4/5 mb-6 group">
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Password
					</label>
				</div>

				<button>
					<BiLogIn onClick={handleSubmit} className="w-12 h-12 text-neutral-900" />
				</button>
			</div>
			<div className="h-full w-1/2 flex items-center justify-center flex-col">
				<Slider className="h-3/5 w-3/5 mt-10" {...settings}>
					<img src="assets/011.png" alt="icon" />
					<img src="assets/009.png" alt="icon" />
					<img src="assets/010.png" alt="icon" />
				</Slider>
				<div className="w-3/5	 h-1/6 flex justify-around items-center mt-10">
					<h4 onClick={() => setSignup(true)} className="cursor-pointer hover:underline">
						Create an acount.
					</h4>
				</div>
			</div>
		</>
	);
};

export default Login;
