import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../../../Redux/Slices/RecipesSlice";
import NewRecipe from "./NewRecipe/NewRecipe";
import { AnimatePresence, motion } from "framer-motion";
import imgPlaceholder from "../../../assets/dishPlaceholder.jpg";

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
				<h1>Benvenuto {user.username}</h1>
				<div className="row g-3">
					<div className="col-12">
						<div className=" p-2 rounded-2">
							<div className="d-flex my-2">
								<p className="display-6 m-0 me-2">Create a new recipe</p>
								<input
									type="button"
									onClick={() => setOpenRecipe(!openRecipe)}
									className="btn btn-primary"
									value={openRecipe ? "Close Recipe" : "Add Recipe"}
								/>
							</div>

							<AnimatePresence>
								{openRecipe && (
									<motion.div
										initial="hidden"
										animate="visible"
										exit="hidden"
										variants={containerVariants}
									>
										<NewRecipe />
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
					{recipes.map((recipe) => (
						<div key={recipe.recipeId} className="col-12">
							<div className="bgLight d-flex">
								<div className="p-2 White rounded-2 rounded-start-pill shadow">
									<img
										src={imgPlaceholder}
										alt={recipe.title}
										className=" rounded-start-pill rounded-end-3 dishImage"
									/>
								</div>
								<div className="White p-2 rounded-2 rounded-end-pill shadow ms-2 w-100">
									<h2>{recipe.title}</h2>
									<p>{recipe.description}</p>
									<p>{recipe.ingredients}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default Home;
