import { configureStore } from "@reduxjs/toolkit";

import { postApi } from "../api/postApi";

const store = configureStore({
	reducer: {
		[postApi.reducerPath]: postApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(postApi.middleware),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
