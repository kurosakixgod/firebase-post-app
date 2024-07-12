import styles from "./comment.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "antd";
import { IComment } from "../../types/comments";

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

	return (
		<li className={styles.comment}>
			<div className={styles.text}>
				<h2>{userName}</h2>

				{user && (
					<Button onClick={() => handleDelete(commentId)}>
						delete
					</Button>
				)}
			</div>
			<p>{message}</p>
		</li>
	);
};

export default Comment;
