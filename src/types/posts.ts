export interface IPost {
	title: string;
	description: string;
	id: string;
	timeCreate: number;
	creator: string;
}

export interface ISinglePost {
	postId: string;
}
