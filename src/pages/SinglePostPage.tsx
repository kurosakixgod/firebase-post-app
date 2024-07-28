import { Link, useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm/CommentForm";
import { CommentList } from "../components/CommentsList/CommentList";
import SinglePost from "../components/SinglePost/SinglePost";
import { useAuth } from "../hooks/useAuth";

import styles from "./pages.module.scss";

const SinglePostPage = () => {
	const user = useAuth();
	const { id: postId } = useParams();

	if (!postId) {
		return <h2>Post not found</h2>;
	}

	return (
		<main className={styles.singlePost}>
			<div className={styles.post}>
				<SinglePost postId={postId} />
				<CommentList postId={postId} />
				{user && <CommentForm postId={postId} user={user} />}
			</div>
			<button className={styles.goBackBtn}>
				<Link to="/">Go back</Link>
			</button>
		</main>
	);
};

export default SinglePostPage;
