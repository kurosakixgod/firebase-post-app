import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";

import { IComment } from "../../types/comments";
import { v4 } from "uuid";
import styles from "./commentForm.module.scss";

import { User } from "firebase/auth";
import { ISinglePost } from "../../types/posts";
import { useAddCommentMutation } from "../../api/commentApi";

interface CommentData {
	commentMessage: string;
}

interface CommentFormProps extends ISinglePost {
	user: User;
}

const CommentForm = ({ postId, user }: CommentFormProps) => {
	const { control, handleSubmit, reset } = useForm<CommentData>();
	const [addComment] = useAddCommentMutation();

	const onSubmit = async ({ commentMessage }: CommentData) => {
		const newComment: IComment = {
			userName: user.email as string,
			message: commentMessage,
			postId,
			id: v4(),
		};
		await addComment(newComment);

		reset();
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
