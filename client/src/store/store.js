import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import modeReducer from "../features/modeSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		mode: modeReducer,
	},
});
