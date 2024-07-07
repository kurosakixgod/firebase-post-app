import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../../api/postApi";

import styles from "./singlePost.module.scss";

const SinglePost = () => {
	const { id } = useParams();

	const { data } = useGetSinglePostQuery(id as string);

	if (!data) {
		return <div>Data not found</div>;
	}

	return (
		<div className={styles.post}>
			<h2 className={styles.title}>{data.title}</h2>
			<p className={styles.descr}>{data.description}</p>
		</div>
	);
};

export default SinglePost;
