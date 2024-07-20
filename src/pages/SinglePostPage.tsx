import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm/CommentForm";
import { CommentList } from "../components/CommentsList/CommentList";
import SinglePost from "../components/SinglePost/SinglePost";
import { useAuth } from "../hooks/useAuth";

const SinglePostPage = () => {
	const user = useAuth();
	const { id: postId } = useParams();

	if (!postId) {
		return <h2>Post not found</h2>;
	}

	return (
		<>
			<div
				style={{
					width: "600px",
					margin: "0 auto",
				}}
			>
				<SinglePost postId={postId} />
				<CommentList postId={postId} />
				{user && <CommentForm postId={postId} user={user} />}
			</div>
		</>
	);
};

export default SinglePostPage;
