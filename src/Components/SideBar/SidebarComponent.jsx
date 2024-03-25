import { useState } from "react";
import "./Side.scss";

const SidebarComponent = () => {
	const [state, setState] = useState(false);
	return (
		<>
			<div
				className={`sidebar rounded-3 pt-3 ps-2 d-flex flex-column justify-content-center align-items-center position-absolute ${
					state ? "sideOpen" : "sideClose"
				}`}
			>
				<div
					className="rounded-top-2 bg-black d-inline p-2 fixed-top text-center cursor-pointer"
					onClick={() => setState(!state)}
				>
					<p className="d-inline m-0 text-white">{state ? "open" : "close"}</p>
				</div>
				<a href="#" className="fs-3 p-2 w-100 text-center">
					{state ? "🏠 Home" : "🏠"}
				</a>
				<a href="#" className="fs-3 p-2 w-100 text-center">
					{state ? "🏠 Home" : "🏠"}
				</a>
				<a href="#" className="fs-3 p-2 w-100 text-center">
					{state ? "🏠 Home" : "🏠"}
				</a>
				<a href="#" className="fs-3 p-2 w-100 text-center">
					{state ? "🏠 Home" : "🏠"}
				</a>
				<a href="#" className="fs-3 p-2 w-100 text-center">
					{state ? "🏠 Home" : "🏠"}
				</a>
				<div className="p-2 w-100 mb-3 ms-2 d-flex align-items-center sideProfile fixed-bottom">
					{state && <p className=" m-0 ">Username</p>}
					<img src="https://via.placeholder.com/50" alt="profile" className="rounded-circle ms-auto me-2" />
				</div>
			</div>
		</>
	);
};
export default SidebarComponent;
