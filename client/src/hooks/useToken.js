import React, { useState, useEffect } from "react";

const useToken = () => {
	const [token, setToken] = useState("");

	useEffect(() => {
		setToken(JSON.parse(localStorage.getItem("auth")));
	}, []);

	return [token];
};

export default useToken;
