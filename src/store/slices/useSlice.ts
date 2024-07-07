// import { createSlice } from "@reduxjs/toolkit";

// export interface IUser {
// 	email: string | null;
// 	refreshToken: string | null;
// }

// interface UserAction {
// 	payload: IUser;
// 	type: string;
// }

// const initialState: IUser = {
// 	email: null,
// 	refreshToken: null,
// };

// const userSlice = createSlice({
// 	name: "user",
// 	initialState,
// 	reducers: {
// 		setUser: (state, action: UserAction) => {
// 			state.email = action.payload.email;
// 			state.refreshToken = action.payload.refreshToken;
// 		},
// 		removeUser: (state) => {
// 			state.email = null;
// 			state.refreshToken = null;
// 		},
// 	},
// });

// export const { setUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;
