import { useDispatch, useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import { useEffect, useState } from "react";
import { logoutUser } from "../../Redux/Slices/authSlice";

// eslint-disable-next-line react/prop-types
const Authentication = ({ setIsLogged }) => {
	const token = useSelector((state) => state.auth.token);
	console.log(token);

	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	useEffect(() => {
		if (user == null) {
			dispatch(logoutUser());
		} else {
			console.log(user);
		}
		setIsLogged(false);
	}, [user, dispatch, setIsLogged]); // Add dependencies here
	const [accedi, setAccedi] = useState(true);

	return (
		<div className="divAuth position-relative">
			<div className="d-flex flex-column justify-content-center registerPos">
				{accedi ? <Login setIsLogged={setIsLogged} /> : <Register />}
				<div className="d-flex align-items-center bg-white rounded-2 mt-2">
					{accedi ? (
						<p className="m-0 p-2">You dont have an ccount?</p>
					) : (
						<p className="m-0 p-2">You already have an account?</p>
					)}
					<button
						className="fw-bold fs-4 border-0 m-0 p-2 bg-transparent text-dark"
						onClick={() => setAccedi(!accedi)}
					>
						{accedi ? "Register" : "Login"}
					</button>
				</div>
			</div>
		</div>
	);
};
export default Authentication;
