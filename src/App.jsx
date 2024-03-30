import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Authentication from "./Components/Auth/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import SidebarComponent from "./Components/SideBar/SidebarComponent";
import Home from "./Components/MainPage/Home/Home";
import Discover from "./Components/MainPage/Discover/Discover";
import Favourites from "./Components/MainPage/Favourites/Favourites";
import Messages from "./Components/MainPage/Messages/Messages";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import SideContent from "./Components/MainPage/rightSide/SideContent";

function App() {
	const constraintsRef = useRef(null);
	const [isLogged, setIsLogged] = useState(true);
	const [isNavOpen, setIsNavOpen] = useState(false);
	return (
		<Router>
			<motion.div className={`App divNoBordi ${isLogged && "container"}`} ref={constraintsRef}>
				<div className="row">
					<div className={`${isLogged ? "col flex-grow-0 vh-100" : "d-none"}`}>
						<motion.div
							drag
							dragConstraints={constraintsRef}
							dragElastic={0.1}
							dragMomentum={true}
							dragTransition={{ bounceDamping: 5 }}
							className="d-flex justify-content-center align-items-center h-100"
						>
							<SidebarComponent setIsNavOpen={setIsNavOpen} />
						</motion.div>
					</div>
					<div
						className={`${isLogged ? "col flex-grow-1 contentContainer rounded-4" : ""} ${
							isNavOpen && "d-none d-sm-block"
						}`}
					>
						<Routes>
							<Route path="/Authentication" element={<Authentication setIsLogged={setIsLogged} />} />
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/discover"
								element={
									<ProtectedRoute>
										<Discover />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/favourites"
								element={
									<ProtectedRoute>
										<Favourites />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/messages"
								element={
									<ProtectedRoute>
										<Messages />
									</ProtectedRoute>
								}
							/>
							{/* Add more routes as needed */}
						</Routes>
					</div>
					<div className="col-3 me-2 overflow-y-auto vh-100 d-none d-lg-flex">
						{/* Add more side content here as needed */}
						{/* generate 3 boxes in column */}
						<div className="h-100">
							<SideContent />
						</div>
					</div>
				</div>
			</motion.div>
		</Router>
	);
}

export default App;
