import PostList from "../components/PostList/PostList";

import styles from "./pages.module.scss";

const MainPage = () => {
	return (
		<main className={styles.page}>
			<PostList />
		</main>
	);
};

export default MainPage;
