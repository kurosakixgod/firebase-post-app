import { Button, Form, Input, Flex } from "antd";
import { useForm, Controller } from "react-hook-form";
import { v4 } from "uuid";
import { useAddPostMutation } from "../../api/postApi";

import styles from "./createPostForm.module.scss";
import { useAuth } from "../../hooks/useAuth";

interface PostData {
	title: string;
	description: string;
}

const CreatePostForm = () => {
	const { control, handleSubmit, reset } = useForm();

	const [addPost] = useAddPostMutation();
	const user = useAuth();
	const onSubmit = async (data: PostData) => {
		if (user?.email) {
			const post = {
				id: v4(),
				...data,
				timeCreate: Date.now(),
				comments: [],
				creator: user.email,
			};
			reset();
			addPost(post);
		}
	};

	return (
		<Form
			className={styles.create__post__form}
			onSubmitCapture={handleSubmit(onSubmit)}
		>
			<Flex vertical gap={20}>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<Input placeholder="Enter title" {...field} />
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<Input.TextArea
							placeholder="Enter description"
							{...field}
						/>
					)}
				/>
				<Button className={styles.post__button} htmlType="submit">
					Create
				</Button>
			</Flex>
		</Form>
	);
};

export default CreatePostForm;
