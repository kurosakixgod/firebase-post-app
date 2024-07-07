import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
	useGetSinglePostQuery,
	useUpdateCommentsMutation,
} from "../../api/postApi";
import { useAuth } from "../../hooks/useAuth";
import { IComment } from "../../types/posts";
import { v4 } from "uuid";
import styles from "./commentForm.module.scss";

const CommentForm = () => {
	const { control, handleSubmit, reset } = useForm();
	const { id } = useParams();
	const { data } = useGetSinglePostQuery(id as string);
	const comments = data?.comments;

	const [updateComments] = useUpdateCommentsMutation();

	const user = useAuth();

	const onSubmit = async ({ commentMessage }: { commentMessage: string }) => {
		if (comments) {
			const newComment: IComment = {
				userName: user?.email as string,
				message: commentMessage,
				id: v4(),
			};

			const newComments = [...comments, newComment];
			const post = await updateComments({
				comments: newComments,
				id: id as string,
			});
			console.log(post);

			reset();
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="commentMessage"
					control={control}
					render={({ field }) => (
						<Input placeholder="Type a comment" {...field} />
					)}
				/>
				<Button htmlType="submit">Create</Button>
			</form>
		</>
	);
};

export default CommentForm;
