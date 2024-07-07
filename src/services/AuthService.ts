import {
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

class AuthService {
	async registration(auth: Auth, email: string, password: string) {
		await createUserWithEmailAndPassword(auth, email, password);
	}

	async login(auth: Auth, email: string, password: string) {
		await signInWithEmailAndPassword(auth, email, password);
	}

	async logOut(auth: Auth) {
		await signOut(auth);
	}
}

export default new AuthService();
