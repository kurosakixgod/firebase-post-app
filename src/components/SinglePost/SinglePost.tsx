import {
	useGetSinglePostQuery,
	useUpdatePostMutation,
} from "../../api/postApi";
import EditIcon from "../ui/EditIcon";
import CrossIcon from "../ui/CrossIcon";

import styles from "./singlePost.module.scss";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";
import CheckIcon from "../ui/CheckIcon";

interface SinglePostProps {
	postId: string;
}

const SinglePost = ({ postId }: SinglePostProps) => {
	const { data } = useGetSinglePostQuery(postId);

	const [updatePost] = useUpdatePostMutation();

	const { handleSubmit, control, getValues } = useForm();

	const [isEdit, setEdit] = useState(false);

	if (!data) {
		return <div>Data not found</div>;
	}

	const onSubmit = () => {
		console.log(getValues());
	};

	const onClose = async () => {
		setEdit(false);
	};

	const handleUpdate = async () => {
		const { title, description } = getValues();

		if (title === data.title && description === data.description) {
			setEdit(false);
			return;
		}

		await updatePost({ id: postId, post: { title, description } });
		setEdit(false);
	};

	return (
		<div className={styles.post}>
			<div className={styles.icons}>
				{isEdit ? (
					<>
						<div className={styles.icon}>
							<CrossIcon onClick={onClose} />
						</div>
						<div className={styles.icon}>
							<CheckIcon onClick={handleUpdate} />
						</div>
					</>
				) : (
					<div className={styles.icon}>
						<EditIcon onClick={() => setEdit(true)} />
					</div>
				)}
			</div>

			{isEdit ? (
				<form
					className={styles.editForm}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						defaultValue={data.title}
						name="title"
						control={control}
						render={({ field }) => (
							<Input className={styles.titleInput} {...field} />
						)}
					/>
					<Controller
						defaultValue={data.description}
						name="description"
						control={control}
						render={({ field }) => (
							<Input
								className={styles.descriptionInput}
								{...field}
							/>
						)}
					/>
				</form>
			) : (
				<div className={styles.text}>
					<h2 className={styles.title}>{data.title}</h2>
					<p className={styles.descr}>{data.description}</p>
				</div>
			)}
		</div>
	);
};

export default SinglePost;
