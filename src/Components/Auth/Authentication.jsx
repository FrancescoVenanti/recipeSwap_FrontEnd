import { useDispatch, useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import { logoutUser } from "../../Redux/Slices/authSlice";

// eslint-disable-next-line react/prop-types
const Authentication = ({ setIsLogged }) => {
	const token = useSelector((state) => state.auth.token);
	console.log(token);
	const user = useSelector((state) => state.auth.user);
	console.log(user);
	const dispatch = useDispatch();
	if (user == null) {
		dispatch(logoutUser());
	}

	setIsLogged(false);
	const [accedi, setAccedi] = useState(true);

	return (
		<div className="divAuth position-relative">
			<div className="d-flex flex-column justify-content-center registerPos">
				{accedi ? <Login setIsLogged={setIsLogged} /> : <Register />}
				<div className="d-flex align-items-center bg-white rounded-2 mt-2">
					{accedi ? (
						<p className="m-0 p-2">Non hai un account?</p>
					) : (
						<p className="m-0 p-2">Hai già un account?</p>
					)}
					<button className="fw-bold fs-4 border-0 m-0 p-2 bg-transparent" onClick={() => setAccedi(!accedi)}>
						{accedi ? "Registrati" : "Accedi"}
					</button>
				</div>
			</div>
		</div>
	);
};
export default Authentication;
