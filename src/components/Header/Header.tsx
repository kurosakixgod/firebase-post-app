import { getAuth } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import AuthService from "../../services/AuthService";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
	const user = useAuth();

	return (
		<header className={styles.header}>
			<nav>
				<ul className={styles.header__navlist}>
					<li>
						<div className={styles.header__btn}>
							<Link to="/">Posts</Link>
						</div>
					</li>
					{user && (
						<li>
							<div className={styles.header__btn}>
								<Link to="/create-post">Create a Post</Link>
							</div>
						</li>
					)}
				</ul>
			</nav>

			<div className={styles.header__authList}>
				{user ? (
					<>
						<div className={styles.header__btn}>Profile</div>

						<div
							className={styles.header__btn}
							onClick={async () => {
								const auth = getAuth();
								await AuthService.logOut(auth);
							}}
						>
							Sign out
						</div>
					</>
				) : (
					<>
						<div className={styles.header__btn}>
							<Link to="/auth">Registration</Link>
						</div>
						<div className={styles.header__btn}>
							<Link to="/auth">Login</Link>
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
