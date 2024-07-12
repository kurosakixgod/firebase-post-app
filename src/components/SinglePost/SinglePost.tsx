import { useGetSinglePostQuery } from "../../api/postApi";

import styles from "./singlePost.module.scss";

interface SinglePostProps {
	postId: string;
}

const SinglePost = ({ postId }: SinglePostProps) => {
	const { data } = useGetSinglePostQuery(postId);

	if (!data) {
		return <div>Data not found</div>;
	}

	console.log(postId);

	return (
		<div className={styles.post}>
			<h2 className={styles.title}>{data.title}</h2>
			<p className={styles.descr}>{data.description}</p>
		</div>
	);
};

export default SinglePost;
