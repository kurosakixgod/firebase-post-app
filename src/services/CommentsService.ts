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
import { IComment } from "../types/comments";

class CommentsService {
	async getComments(postId: string) {
		const commentsRef = collection(db, "comments");
		const q = query(commentsRef, where("postId", "==", postId));

		const snapshot = await getDocs(q);
		const comments: IComment[] = [];

		snapshot.forEach((doc) => {
			const { postId, message, userName } = doc.data() as IComment;

			const comment = { id: doc.id, postId, message, userName };

			comments.push(comment);
		});

		return comments;
	}

	async addComment(comment: IComment) {
		const commentsRef = collection(db, "comments");
		await addDoc(commentsRef, comment);
	}

	async deleteComment(postId: string, commentId: string) {
		const comments = await this.getComments(postId);

		for (const comment of comments) {
			if (comment.id === commentId) {
				await deleteDoc(doc(db, "comments", comment.id));
			}
		}
	}
}

export default new CommentsService();
