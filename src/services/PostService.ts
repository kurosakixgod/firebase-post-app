import { db } from "../firebase";
import {
	getDocs,
	addDoc,
	collection,
	getDoc,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import { IPost } from "../types/posts";

class PostService {
	private collectionRef = collection(db, "posts");

	async getPosts() {
		const data = await getDocs(this.collectionRef);
		const posts: IPost[] = [];
		data.forEach((doc) => {
			const { title, description, timeCreate, creator } =
				doc.data() as IPost;
			const post: IPost = {
				id: doc.id,
				description,
				title,
				timeCreate,
				creator,
			};

			posts.push(post);
		});
		return posts;
	}

	async getSinglePost(id: string) {
		const data = await getDoc(doc(db, "posts", id));

		const { title, description, timeCreate, creator } =
			data.data() as IPost;
		const post: IPost = {
			id: data.id,
			description,
			title,
			timeCreate,
			creator,
		};
		return post;
	}

	async addPost(post: IPost) {
		await addDoc(this.collectionRef, post);
	}

	async deletePost(id: string) {
		await deleteDoc(doc(db, "posts", id));
	}

	async updatePost(id: string, post: { title: string; description: string }) {
		await updateDoc(doc(db, "posts", id), post);
	}
}

export default new PostService();
