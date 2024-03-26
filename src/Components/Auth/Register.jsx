import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Slices/authSlice";

const Register = () => {
	const [user, setUser] = useState({
		Username: "",
		Email: "",
		PswHash: "",
		confirmPsw: "",
		FirstName: "",
		LastName: "",
		Locality: "",
		Gender: "",
		Bio: "",
	});
	const dispatch = useDispatch();
	const { isLoading, isError, message } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			Username: user.Username,
			Email: user.Email,
			PswHash: user.PswHash,
			confirmPsw: user.confirmPsw,
			FirstName: user.FirstName,
			LastName: user.LastName,
			Locality: user.Locality,
			Gender: user.Gender,
			Bio: user.Bio,
		};
		console.log(userData);
		dispatch(registerUser(userData));
	};

	return (
		<form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
			<input
				type="email"
				value={registerUser.Email}
				onChange={(e) => setUser({ ...user, Email: e.target.value })}
				placeholder="Email"
				required
			/>
			<input
				type="password"
				value={user.PswHash}
				onChange={(e) => setUser({ ...user, PswHash: e.target.value })}
				placeholder="Password"
				required
			/>
			<input
				type="password"
				value={user.confirmPsw}
				onChange={(e) => setUser({ ...user, confirmPsw: e.target.value })}
				placeholder="Confirm Password"
				required
			/>
			<input
				type="text"
				value={user.Username}
				onChange={(e) => setUser({ ...user, Username: e.target.value })}
				placeholder="Username"
				required
			/>
			<input
				type="text"
				value={user.FirstName}
				onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
				placeholder="First Name"
				required
			/>
			<input
				type="text"
				value={user.LastName}
				onChange={(e) => setUser({ ...user, LastName: e.target.value })}
				placeholder="Last Name"
				required
			/>
			<input
				type="text"
				value={user.Locality}
				onChange={(e) => setUser({ ...user, Locality: e.target.value })}
				placeholder="Locality"
			/>
			<input
				type="text"
				value={user.Gender}
				onChange={(e) => setUser({ ...user, Gender: e.target.value })}
				placeholder="Gender"
			/>
			<input
				type="text"
				value={user.Bio}
				onChange={(e) => setUser({ ...user, Bio: e.target.value })}
				placeholder="Bio"
			/>
			<button type="submit" disabled={isLoading}>
				Register
			</button>
			{isError && <p>{message}</p>}
		</form>
	);
};

export default Register;
