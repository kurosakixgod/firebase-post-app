import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import MainPage from "./pages/MainPage";
import CreatePostPage from "./pages/CreatePostPage";
import SinglePostPage from "./pages/SinglePostPage";
import Header from "./components/Header/Header";

import "./index.css";

function App() {
	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/auth" element={<AuthForm />} />
					<Route path="/create-post" element={<CreatePostPage />} />
					<Route path="/" element={<MainPage />} />
					<Route path="/:id" element={<SinglePostPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
