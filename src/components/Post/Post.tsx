import { Link } from "react-router-dom";
import { IPost } from "../../types/posts";
import { useDeletePostMutation } from "../../api/postApi";

import styles from "./post.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "antd";

const Post = ({ description, title, id, creator }: IPost) => {
	const [deletePost] = useDeletePostMutation();

	const user = useAuth();

	return (
		<li className={styles.item}>
			<Link to={`/${id}`} className={styles.post}>
				<h2>{title}</h2>
				<p>{description}</p>
			</Link>
			{user?.email === creator && (
				<Button onClick={() => deletePost(id)}>delete</Button>
			)}
		</li>
	);
};

export default Post;
