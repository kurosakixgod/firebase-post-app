import { configureStore } from "@reduxjs/toolkit";

import { postApi } from "../api/postApi";
import { commentApi } from "../api/commentApi";
import { likeApi } from "../api/likeApit";

const store = configureStore({
	reducer: {
		[postApi.reducerPath]: postApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[likeApi.reducerPath]: likeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			postApi.middleware,
			commentApi.middleware,
			likeApi.middleware,
		),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
