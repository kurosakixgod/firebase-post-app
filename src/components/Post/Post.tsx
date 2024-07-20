import { Link } from "react-router-dom";
import { IPost } from "../../types/posts";
import { useDeletePostMutation } from "../../api/postApi";

import styles from "./post.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useDeleteAllCommentsMutation } from "../../api/commentApi";
import TrashIcon from "../ui/TrashIcon";

const Post = ({ description, title, id, creator }: IPost) => {
	const [deletePost] = useDeletePostMutation();
	const [deleteAllComments] = useDeleteAllCommentsMutation();
	const user = useAuth();
	console.log(id);

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();

		await deletePost(id);
		await deleteAllComments(id);
	};

	return (
		<li className={styles.item}>
			<Link to={`/${id}`} className={styles.post}>
				<h2>{title}</h2>
				<p>
					{description.length > 90
						? `${description.slice(0, 90)}...`
						: description}
				</p>
				{user?.email === creator && (
					<TrashIcon
						className={styles.deleteButton}
						onClick={handleDelete}
					/>
				)}
			</Link>
		</li>
	);
};

export default Post;
