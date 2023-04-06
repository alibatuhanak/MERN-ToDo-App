import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Register = ({ setSignup, signup, auth, setAuth }) => {
	const settings = {
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 3000,
		draggable: false,
		arrows: false,
	};

	const [controlForRegister, setControlForRegister] = useState(false);

	const handleChange = e => {
		console.log(auth);
		const { name, value } = e.target;
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
			const res = await axios.post("http://localhost:5000/auth/register", auth);
			console.log(res);
			setControlForRegister(true);
			toast("Redirect to login page.", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
			setAuth({
				email: "",
				username: "",
				password: "",
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

	useEffect(() => {
		if (controlForRegister) {
			setTimeout(() => {
				setSignup(false);
			}, 3000);
		}
	}, [controlForRegister, setSignup]);

	return (
		<>
			<div className="h-full w-1/2 flex items-center justify-center flex-col">
				<Slider className="h-3/5 w-3/5 mt-10" {...settings}>
					<img src="assets/013.png" alt="icon" />
					<img src="assets/012.png" alt="icon" />
					<img src="assets/008.png" alt="icon" />
				</Slider>
				<div className="w-3/5	 h-1/8 flex justify-around items-center mt-10">
					<h4 onClick={() => setSignup(false)} className="cursor-pointer hover:underline font-">
						I am already member.
					</h4>
				</div>
			</div>
			<div className="h-full w-1/2 flex justify-center items-center flex-col">
				<div className="relative z-0 w-4/5 mb-6 group">
					<input
						onChange={handleChange}
						type="text"
						name="email"
						id="email"
						value={auth.email}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Email address
					</label>
				</div>

				<div className="relative z-0 w-4/5 mb-6 group">
					<input
						onChange={handleChange}
						type="text"
						name="username"
						id="username"
						value={auth.username}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="username"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Username
					</label>
				</div>

				<div className="relative z-0 w-4/5 mb-6 group">
					<input
						onChange={handleChange}
						type="password"
						name="password"
						id="password"
						value={auth.password}
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
		</>
	);
};

export default Register;
