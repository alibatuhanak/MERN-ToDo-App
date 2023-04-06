import React, { useState } from "react";

import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
	const [signup, setSignup] = useState(false);

	const [auth, setAuth] = useState({
		username: "",
		email: "",
		password: "",
	});

	return (
		<div className="bg-slate-900 w-screen h-screen flex justify-center items-center">
			<div className="max-[480px]:w-full max-[1000px]:w-[90vw] max-w-[800px]  bg-slate-300 w-3/5 h-3/5 flex items-center justify-center rounded-2xl">
				{!signup ? (
					<Login auth={auth} setAuth={setAuth} signup={signup} setSignup={setSignup} />
				) : (
					<Register auth={auth} setAuth={setAuth} signup={signup} setSignup={setSignup} />
				)}
			</div>
		</div>
	);
};

export default Auth;
