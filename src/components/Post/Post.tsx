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

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();

		await deletePost(id);
		await deleteAllComments(id);
	};

	return (
		<li className={styles.item}>
			<Link to={`/${id}`} className={styles.post}>
				<div className={styles.titleWrapper}>
					<h2 className={styles.title}>{title}</h2>
					{user?.email === creator && (
						<div>
							<TrashIcon
								className={styles.deleteButton}
								onClick={handleDelete}
							/>
						</div>
					)}
				</div>
				<p className={styles.descr}>{description}</p>
			</Link>
		</li>
	);
};

export default Post;
