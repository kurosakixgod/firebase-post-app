import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import PostService from "../services/PostService";
import { IComment, IPost } from "../types/posts";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["post"],
	endpoints: (builder) => ({
		getPosts: builder.query<IPost[], void>({
			queryFn: async () => {
				try {
					const result = await PostService.getPosts();
					return { data: result };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ["post"],
		}),
		getSinglePost: builder.query<IPost, string>({
			queryFn: async (id) => {
				try {
					const result = await PostService.getSinglePost(id);
					if (!result) {
						throw new Error("Post not found");
					}
					return { data: result };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ["post"],
		}),

		addPost: builder.mutation<IPost, IPost>({
			queryFn: async (post) => {
				try {
					await PostService.addPost(post);
					return { data: post };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["post"],
		}),

		updateComments: builder.mutation<
			IPost,
			{ comments: IComment[]; id: string }
		>({
			queryFn: async ({ comments, id }) => {
				try {
					const updatedPost = await PostService.updateComments(
						comments,
						id,
					);
					return { data: updatedPost };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["post"],
		}),
		deletePost: builder.mutation<null, string>({
			queryFn: async (id) => {
				try {
					await PostService.deletePost(id);
					return { data: null };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["post"],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useAddPostMutation,
	useGetSinglePostQuery,
	useUpdateCommentsMutation,
	useDeletePostMutation,
} = postApi;
