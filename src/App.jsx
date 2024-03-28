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

function App() {
	//come prendo roba dallo store redux?
	const constraintsRef = useRef(null);
	const [isLogged, setIsLogged] = useState(true);
	return (
		<Router>
			<motion.div className="App divNoBordi container" ref={constraintsRef}>
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
							<SidebarComponent />
						</motion.div>
					</div>
					<div className={`${isLogged ? "col flex-grow-1 contentContainer rounded-4" : ""}`}>
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
					<div className="col-4 me-2 overflow-y-auto h-100 d-none d-md-flex">
						{/* Add more side content here as needed */}
						{/* generate 3 boxes in column */}

						<div className="d-flex align-items-center h-100 overflow-y-auto flex-column justify-content-center">
							<h2 className="text-center mt-2">Side content here</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, dignissimos, et debitis
								illo similique incidunt reprehenderit ut autem iste adipisci corporis inventore
								assumenda suscipit enim rerum laborum perferendis sed molestiae. Reprehenderit
								repellendus molestias facilis! Dolor cum beatae similique reiciendis nihil eius nisi,
								nulla ducimus dolorem mollitia, fugiat, accusamus odit a exercitationem ipsam. Sapiente,
								veritatis impedit reprehenderit maxime cupiditate officiis labore.
							</p>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
						</div>
					</div>
				</div>
			</motion.div>
		</Router>
	);
}

export default App;
