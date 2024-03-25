import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slices/authSlice";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser({ username, password }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button type="submit">Login</button>
		</form>
	);
};
export default Login;
