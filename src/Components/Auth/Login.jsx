import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({ setIsLogged }) => {
	const [username, setUsername] = useState("");
	const [pswHash, setPswHash] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(loginUser({ username, pswHash })).unwrap();
			setIsLogged(true);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="d-flex flex-column">
			<p className="lead fs-4 text-success fw-bold text-center">Login</p>
			<input
				className="form-control mt-2"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				className="form-control mt-2"
				type="password"
				value={pswHash}
				onChange={(e) => setPswHash(e.target.value)}
				placeholder="Password"
			/>
			<button className="form-control mt-2" type="submit">
				Login
			</button>
		</form>
	);
};
export default Login;
