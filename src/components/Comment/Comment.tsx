import styles from "./comment.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "antd";
import { IComment } from "../../types/comments";
import {
	useCheckLikeQuery,
	useGetLikesByCommentQuery,
	useLikeCommentMutation,
} from "../../api/likeApit";
import LikeIcon from "../ui/LikeIcon";
import TrashIcon from "../ui/TrashIcon";

interface CommentProps extends IComment {
	handleDelete: (commentId: string) => void;
}

const Comment = ({
	message,
	userName,
	handleDelete,
	id: commentId,
}: CommentProps) => {
	const user = useAuth();

	const [likeComment] = useLikeCommentMutation();
	const { data } = useCheckLikeQuery(commentId);
	const { data: likes } = useGetLikesByCommentQuery(commentId);

	return (
		<li className={styles.comment}>
			<div className={styles.text}>
				<h2>{userName}</h2>
				<div className={styles.likes}>
					<div>{likes?.length}</div>
					<LikeIcon
						className={styles.like}
						onClick={() =>
							likeComment({
								commentId,
								userId: user?.uid as string,
							})
						}
						style={{
							color: data ? "red" : "inherit",
						}}
					/>
				</div>
				{user && (
					<TrashIcon
						className={styles.deleteButton}
						onClick={() => handleDelete(commentId)}
					/>
				)}
			</div>
			<p>{message}</p>
		</li>
	);
};

export default Comment;
