import { configureStore } from "@reduxjs/toolkit";

import { postApi } from "../api/postApi";
import { commentApi } from "../api/commentApi";

const store = configureStore({
	reducer: {
		[postApi.reducerPath]: postApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			postApi.middleware,
			commentApi.middleware,
		),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
