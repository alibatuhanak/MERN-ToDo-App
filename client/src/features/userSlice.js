import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { auth: {} },
	reducers: {
		login: (state, action) => {
			localStorage.setItem("auth", JSON.stringify(action.payload));
			return {
				...state,
				auth: action.payload,
			};
		},
		register: (state, action) => {
			// !you can redirect to home page when register
			//localStorage.setItem("auth", JSON.stringify(action.payload));
			return {
				...state,
				auth: action.payload,
			};
		},
		logout: (state, action) => {
			localStorage.removeItem("auth");
			return {
				auth: {},
			};
		},
	},
});

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
