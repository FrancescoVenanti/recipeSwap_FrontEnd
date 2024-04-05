/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../../../Redux/Slices/RecipesSlice";
import NewRecipe from "./NewRecipe/NewRecipe";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import SingleRecipe from "./SingleRecipe/SingleRecipe";
import AdComponent from "../../GlobalComponents/AdComponent";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [openRecipe, setOpenRecipe] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const containerVariants = {
		hidden: { opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.5 } },
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.8,
				when: "beforeChildren",
				staggerChildren: 0.3,
			},
		},
	};

	useEffect(() => {
		if (user == null) {
			navigate("/Authentication");
		} else if (token) {
			dispatch(fetchRecipes(token)).then((action) => {
				if (action.type.endsWith("fulfilled")) {
					setRecipes(action.payload);
				}
			});
		}
	}, [user, token, dispatch, navigate]);

	return (
		<>
			<div className=" h-100">
				<h1 className="display-4">
					Hello, <span className="text-green">{user.username}</span>
				</h1>
				<div className="row g-4  overflow-x-hidden">
					<div className="col-12">
						<div className=" p-2 rounded-2">
							<div className="col my-2">
								<button
									onClick={() => setOpenRecipe(!openRecipe)}
									className="btn btn-outline-green rounded-2 shadow"
								>
									{openRecipe ? (
										<FontAwesomeIcon icon={faMinus} />
									) : (
										<>
											Add a recipe <FontAwesomeIcon icon={faAdd} />
										</>
									)}
								</button>
							</div>

							<AnimatePresence>
								{openRecipe && (
									<motion.div
										initial="hidden"
										animate="visible"
										exit="hidden"
										variants={containerVariants}
										className="shadow"
									>
										<NewRecipe />
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
					{recipes.map((recipe, index) => (
						<React.Fragment key={index}>
							<SingleRecipe key={recipe.recipeId} recipe={recipe} />
							{/* todo forse togliere adcomponent */}
							{(index + 1) % 3 === 0 && (
								<div className="w-100">
									<AdComponent />
								</div>
							)}
						</React.Fragment>
					))}
					<div className="col-12 my-4">
						<div className="d-flex justify-content-center">
							<button className="btn btn-primary">Load More</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Home;
