import CommentForm from "../components/CommentForm/CommentForm";
import { CommentList } from "../components/CommentsList/CommentList";
import Header from "../components/Header/Header";
import SinglePost from "../components/SinglePost/SinglePost";

const SinglePostPage = () => {
	return (
		<>
			<Header />

			<div
				style={{
					width: "600px",
					margin: "0 auto",
				}}
			>
				<SinglePost />
				<CommentList />
				<CommentForm />
			</div>
		</>
	);
};

export default SinglePostPage;
