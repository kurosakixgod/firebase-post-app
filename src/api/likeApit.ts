import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILike } from "../types/likes";
import LikesService from "../services/LikesService";

export const likeApi = createApi({
	reducerPath: "likeApi",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["like"],
	endpoints: (builder) => ({
		likeComment: builder.mutation<ILike, ILike>({
			queryFn: async (like) => {
				try {
					await LikesService.likeComment(like);
					return { data: like };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["like"],
		}),
		checkLike: builder.query<boolean, string>({
			queryFn: async (commentId) => {
				try {
					const data = await LikesService.checkLikes(commentId);
					return { data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ["like"],
		}),
		removeLike: builder.mutation<null, string>({
			queryFn: async (commentId) => {
				try {
					await LikesService.removeLike(commentId);
					return { data: null };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["like"],
		}),
		getLikesByComment: builder.query<ILike[], string>({
			queryFn: async (commentId) => {
				try {
					const data = await LikesService.getLikesByComment(
						commentId,
					);
					return { data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ["like"],
		}),
	}),
});

export const {
	useLikeCommentMutation,
	useCheckLikeQuery,
	useRemoveLikeMutation,
	useGetLikesByCommentQuery,
} = likeApi;
