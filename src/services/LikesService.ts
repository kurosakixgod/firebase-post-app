import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ILike } from "../types/likes";

class LikesService {
	private likesRef = collection(db, "likes");

	async removeLike(commentId: string) {
		const q = query(this.likesRef, where("commentId", "==", commentId));
		const snapshot = await getDocs(q);

		snapshot.forEach((comment) => {
			deleteDoc(doc(db, "likes", comment.id));
		});
	}

	async likeComment(like: ILike) {
		const isLiked = await this.checkLikes(like.commentId);
		if (isLiked) {
			await this.removeLike(like.commentId);
			return;
		}
		await addDoc(this.likesRef, like);
	}

	async checkLikes(commentId: string) {
		const q = query(this.likesRef, where("commentId", "==", commentId));
		const data = await getDocs(q);

		return !data.empty;
	}

	async getLikesByComment(commentId: string) {
		const q = query(this.likesRef, where("commentId", "==", commentId));
		const data = await getDocs(q);

		const likes = data.docs.map((doc) => doc.data() as ILike);

		return likes;
	}
}

export default new LikesService();
