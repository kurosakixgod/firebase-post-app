import { useGetPostsQuery } from "../../api/postApi";

import Post from "../Post/Post";

import styles from "./postList.module.scss";

const PostList = () => {
	const { data, isLoading, isError } = useGetPostsQuery();

	const sortedData = data?.toSorted((a, b) => b.timeCreate - a.timeCreate);

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	if (isError) {
		return <h1>Errror</h1>;
	}

	if (!data?.length) {
		return <h1>No posts</h1>;
	}

	return (
		<div>
			<ul className={styles.post__list}>
				{sortedData &&
					sortedData.map((post) => <Post key={post.id} {...post} />)}
			</ul>
		</div>
	);
};

export default PostList;
