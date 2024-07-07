import styles from "./commentList.module.scss";
import Comment from "../Comment/Comment";

import {
	useGetSinglePostQuery,
	useUpdateCommentsMutation,
} from "../../api/postApi";
import { useParams } from "react-router-dom";

export const CommentList = () => {
	const { id } = useParams();
	const { data } = useGetSinglePostQuery(id as string);
	const [updateComments] = useUpdateCommentsMutation();

	const comments = data?.comments;

	const handleDelete = async (commentId: string) => {
		if (comments) {
			const newComments = comments.filter(
				(comment) => comment.id !== commentId,
			);
			console.log("deleted");

			await updateComments({ comments: newComments, id: id as string });
		}
	};

	return (
		<div>
			<div className={styles.comment__length}>
				Comments: {comments?.length}
			</div>
			<ul className={styles.comment__list}>
				{comments?.map((item) => (
					<Comment
						handleDelete={handleDelete}
						key={item.id}
						{...item}
					/>
				))}
			</ul>
		</div>
	);
};
