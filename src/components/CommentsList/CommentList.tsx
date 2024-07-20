import styles from "./commentList.module.scss";
import Comment from "../Comment/Comment";
import {
	useDeleteCommentMutation,
	useGetCommentsQuery,
} from "../../api/commentApi";

import { ISinglePost } from "../../types/posts";
import { useRemoveLikeMutation } from "../../api/likeApit";

export const CommentList = ({ postId }: ISinglePost) => {
	const [deleteComment] = useDeleteCommentMutation();
	const [removeLike] = useRemoveLikeMutation();

	const handleDelete = async (commentId: string) => {
		await deleteComment({ postId, commentId });
		await removeLike(commentId);
	};

	const { data } = useGetCommentsQuery(postId);

	return (
		<div>
			<div className={styles.comment__length}>
				Comments: {data?.length}
			</div>
			<ul className={styles.comment__list}>
				{data?.map((comment) => (
					<Comment
						handleDelete={handleDelete}
						{...comment}
						key={comment.id}
					/>
				))}
			</ul>
		</div>
	);
};
