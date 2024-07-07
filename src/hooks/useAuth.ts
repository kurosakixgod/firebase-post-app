import { useEffect, useState } from "react";
import { app } from "../firebase";
import { User, getAuth } from "firebase/auth";

export const useAuth = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const auth = getAuth(app);

		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return () => unsubscribe();
	}, [currentUser]);

	return currentUser;
};
