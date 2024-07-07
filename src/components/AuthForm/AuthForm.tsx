import { Controller, useForm } from "react-hook-form";
import { Button, Input, Space, Flex } from "antd";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

import { useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";

import "./authForm.scss";

interface AuthData {
	login: string;
	password: string;
}

const AuthForm = () => {
	const navigate = useNavigate();
	const {
		formState: { errors, isValid },
		handleSubmit,
		reset,
		control,
		getValues,
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
		},
	});

	const handleRegistration = async () => {
		const auth = getAuth(app);
		const data = getValues();

		try {
			await AuthService.registration(auth, data.login, data.password);
		} catch (err) {
			console.log(errors.root);
		}
	};

	const handleLogin = async () => {
		const auth = getAuth(app);
		const data = getValues();

		try {
			await AuthService.login(auth, data.login, data.password);
		} catch (err) {
			return "error";
		}
	};

	const onSubmit = (data: AuthData) => {
		console.log(data);
		navigate("/");
		reset();
	};

	console.log(errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="auth-form">
			<Space direction="vertical">
				<h1 className="auth-form__title">Authorization Form</h1>
				<Controller
					name="login"
					control={control}
					render={({ field }) => (
						<Input placeholder="Enter the login" {...field} />
					)}
					rules={{
						required: true,
						minLength: { value: 5, message: "Minimum 5 letters" },
					}}
				/>
				{errors.login && <div>{errors.login.message}</div>}
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<Input placeholder="Enter the password" {...field} />
					)}
					rules={{
						required: true,
						minLength: { value: 5, message: "Minimum 5 letters" },
					}}
				/>
				{errors.password && <div>{errors.password.message}</div>}
				<Flex gap={15} justify="space-between">
					<Button
						htmlType="submit"
						disabled={!isValid}
						onClick={handleRegistration}
						block
					>
						Registration
					</Button>
					<Button
						onClick={handleLogin}
						htmlType="submit"
						disabled={!isValid}
						block
					>
						Login
					</Button>
				</Flex>
			</Space>
		</form>
	);
};

export default AuthForm;
