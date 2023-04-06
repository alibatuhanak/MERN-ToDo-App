import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import useToken from "./hooks/useToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import Licence from "./pages/Licence";

import { useSelector } from "react-redux";

function App() {
	// const [token] = useToken();
	const modeRedux = useSelector(state => state.mode.dark_mode);
	const mode = JSON.parse(localStorage.getItem("mode"));
	const token = JSON.parse(localStorage.getItem("auth"));
	console.log(mode);

	useEffect(() => {
		document.body.style.backgroundColor = mode?.mode === "light" ? "#bcd6e3" : "#232526";
	}, [mode, modeRedux]);
	return (
		<>
			{token?.AccessToken && <Navbar />}
			<Routes>
				<Route path="/auth" element={token?.AccessToken ? <Navigate to="/home" /> : <Auth />} />
				<Route path="/" element={!token?.AccessToken ? <Navigate to="/auth" /> : <Navigate to="/home" />} />
				<Route path="/home" element={token?.AccessToken ? <Home /> : <Navigate to="/auth" />} />
				<Route path="/settings" element={token?.AccessToken ? <Settings /> : <Navigate to="/auth" />} />
				<Route path="/licence" element={token?.AccessToken ? <Licence /> : <Navigate to="/auth" />} />
				<Route path="*" element={token?.AccessToken ? <Navigate to="/home" replace /> : <Navigate to="/auth" replace />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
