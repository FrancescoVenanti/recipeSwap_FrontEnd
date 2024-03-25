import { useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import { useState } from "react";

const Authentication = () => {
	const token = useSelector((state) => state.auth.token);
	console.log(token);
	const user = useSelector((state) => state.auth.user);
	console.log(user);

	const [accedi, setAccedi] = useState(true);

	return (
		<div>
			{token ? <h2>Benvenuto {user.Username}</h2> : ""}
			<div>
				{!token && (
					<>
						{accedi ? <Login /> : <Register />}
						<button onClick={() => setAccedi(!accedi)}>{accedi ? "Registrati" : "Accedi"}</button>
					</>
				)}
			</div>

			{token && <Logout />}
		</div>
	);
};
export default Authentication;
