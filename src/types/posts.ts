export interface IPost {
	title: string;
	description: string;
	id: string;
	timeCreate: number;
	comments: IComment[];
	creator: string;
}

export interface IComment {
	message: string;
	userName: string;
	id: string;
}
