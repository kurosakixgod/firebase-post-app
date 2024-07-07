import { db } from "../firebase";
import {
	getDocs,
	addDoc,
	collection,
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { IComment, IPost } from "../types/posts";

class PostService {
	async getPosts() {
		const data = await getDocs(collection(db, "posts"));
		const posts: IPost[] = [];
		data.forEach((doc) => {
			const { title, description, timeCreate, comments, creator } =
				doc.data();
			const post: IPost = {
				id: doc.id,
				description,
				title,
				timeCreate,
				comments,
				creator,
			};

			posts.push(post);
		});
		return posts;
	}

	async getSinglePost(id: string) {
		const data = await getDoc(doc(db, "posts", id));
		if (data.exists()) {
			const { title, description, timeCreate, comments, creator } =
				data.data();
			const post: IPost = {
				id: data.id,
				description,
				title,
				timeCreate,
				comments,
				creator,
			};
			return post;
		}
	}

	async addPost(post: IPost) {
		await addDoc(collection(db, "posts"), post);
	}

	async updateComments(comments: IComment[], id: string) {
		await updateDoc(doc(db, "posts", id), {
			comments,
		});

		const post = await this.getSinglePost(id);

		return post;
	}

	async updateComment(comments: IComment[], id: string) {
		await updateDoc(doc(db, "posts", id), {
			comments,
		});

		const post = await this.getSinglePost(id);

		return post;
	}

	async deletePost(id: string) {
		await deleteDoc(doc(db, "posts", id));
	}
}

export default new PostService();
