export interface IComment {
	id: string;
	postId: string;
	message: string;
	userName: string;
}

export interface ILike {
	postId: string;
	commentId: string;
	userId: string;
	id: string;
}
