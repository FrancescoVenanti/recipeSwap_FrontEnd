import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";

const SidebarComponent = () => {
	const [state, setState] = useState(false);
	const [hover, setHover] = useState(false);
	return (
		<>
			<div className={`sidebar rounded-3 pt-3 ps-2  position-absolute ${state ? "sideOpen" : "sideClose"}`}>
				<div
					className="rounded-top-2 bg-black d-inline p-2 fixed-top text-center cursor-pointer"
					onClick={() => setState(!state)}
				>
					<p className="d-inline m-0 text-white">{state ? "open" : "close"}</p>
				</div>
				<div className="py-5 d-flex flex-column justify-content-center align-items-center mb-5">
					<ButtonGroup className="mb-2">
						<button className="btn btn-success">{state ? "Recipes" : "🍝"}</button>
						<button className="btn btn-warning">{state ? "People" : "👩"}</button>
					</ButtonGroup>

					<input type="text" className="form-control w-75 mb-3" placeholder={state ? "Search" : "🔍"} />

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
				</div>
				<div
					className="p-2 w-100 mb-3 ms-2 d-flex align-items-center sideProfile fixed-bottom"
					onMouseEnter={() => setHover(!hover)}
					onMouseLeave={() => setHover(!hover)}
				>
					{state && <p className=" m-0 ">Username</p>}
					<img
						src="https://img.freepik.com/free-photo/young-man-wearing-blue-outfit-looking-confident_1298-291.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710374400&semt=ais"
						alt="profile"
						className={`rounded-circle ms-auto me-2 ${hover ? "imgHuge" : "imgSmall"}`}
					/>
				</div>
			</div>
		</>
	);
};
export default SidebarComponent;
