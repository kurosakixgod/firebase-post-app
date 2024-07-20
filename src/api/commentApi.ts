import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment } from "../types/comments";
import CommentService from "../services/CommentService";
import CommentsService from "../services/CommentsService";

export interface DeleteCommentArg {
	postId: string;
	commentId: string;
}

export const commentApi = createApi({
	reducerPath: "commentApi",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["comment"],
	endpoints: (builder) => ({
		// deleteComment: builder.mutation<null, DeleteCommentArg>({
		// 	queryFn: async ({ commentId, postId }) => {
		// 		try {
		// 			await CommentService.deleteComment(postId, commentId);
		// 			return { data: null };
		// 		} catch (error) {
		// 			return { error };
		// 		}
		// 	},
		// 	invalidatesTags: ["comment"],
		// }),
		getComments: builder.query<IComment[], string>({
			queryFn: async (postId) => {
				try {
					const data = await CommentsService.getComments(postId);
					return { data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ["comment"],
		}),
		addComment: builder.mutation<IComment, IComment>({
			queryFn: async (comment) => {
				try {
					await CommentsService.addComment(comment);
					return { data: comment };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["comment"],
		}),
		deleteComment: builder.mutation<null, DeleteCommentArg>({
			queryFn: async ({ postId, commentId }) => {
				try {
					await CommentsService.deleteComment(postId, commentId);
					return { data: null };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["comment"],
		}),
		deleteAllComments: builder.mutation<null, string>({
			queryFn: async (postId) => {
				try {
					await CommentsService.deleteAllComments(postId);
					return { data: null };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["comment"],
		}),
	}),
});

export const {
	useAddCommentMutation,
	useGetCommentsQuery,
	useDeleteCommentMutation,
	useDeleteAllCommentsMutation,
} = commentApi;
