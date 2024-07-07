import { IComment } from "../../types/posts";

import styles from "./comment.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "antd";

interface Props extends IComment {
	handleDelete: (commentId: string) => void;
}

const Comment = ({ message, userName, id, handleDelete }: Props) => {
	const user = useAuth();

	return (
		<li className={styles.comment}>
			<div className={styles.text}>
				<h2>{userName}</h2>
				<div className={styles.likes}>
					{user && (
						<Button onClick={() => handleDelete(id)}>delete</Button>
					)}
				</div>
			</div>
			<p>{message}</p>
		</li>
	);
};

export default Comment;
