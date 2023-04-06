import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
	name: "mode",
	initialState: { dark_mode: "" },
	reducers: {
		switchMode: (state, action) => {
			localStorage.setItem("mode", JSON.stringify({ mode: action.payload }));
			return {
				...state,
				dark_mode: action.payload,
			};
		},
	},
});

export default modeSlice.reducer;
export const { switchMode } = modeSlice.actions;
