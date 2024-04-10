import imgPlaceholder from "../../../../assets/dishPlaceholder.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import userPlaceholder from "../../../../assets/userPlaceholder.png";
import PropTypes from "prop-types";
import FavoriteButton from "../../../GlobalComponents/FavoriteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Likes from "../../../GlobalComponents/Likes";
import { deleteRecipe } from "../../../../Redux/Slices/RecipesSlice";

// Animation variants
const variants = {
	offscreen: {
		x: -100, // Start off-screen to the left
		opacity: 0,
	},
	onscreen: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};

const SingleRecipe = ({ recipe }) => {
	const recipeId = recipe.recipeId;
	const recipes = useSelector((state) => state.recipes.recipes);
	recipe = recipes.find((recipe) => recipe.recipeId === recipeId);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	// Effect hook to update local `isFavorited` state whenever the `favorites` state changes

	const dispatch = useDispatch();
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const handleDelete = async () => {
		const recipeId = recipe.recipeId;
		dispatch(deleteRecipe({ token, recipeId }));
		//reload page
	};

	return (
		<>
			<motion.div
				ref={ref}
				variants={variants}
				initial="offscreen"
				animate={inView ? "onscreen" : "offscreen"}
				className="col-12"
			>
				{/* Image Container - Make it full width on small screens and automatically adjust on larger screens */}
				<div className=" ms-1 d-flex align-items-center mb-1">
					<img
						src={recipe.user.profilePicture ? recipe.user.profilePicture : userPlaceholder}
						alt="user profile picture"
						className="img-fluid"
						style={{ width: "36px", height: "36px", borderRadius: "50%" }}
					/>

					<p className="m-0 ms-2 fs-5 me-2">{recipe.user.username}</p>
					{recipe.user.userId !== user.id && <FontAwesomeIcon icon={faUserPlus} />}
				</div>
				<div className="rounded-2 d-flex justify-content-center align-items-center flex-column flex-md-row recipeContainer ">
					<Link to={`/Recipe/${recipe.recipeId}`} className="text-decoration-none p-0 m-0 h-100">
						<img
							src={recipe.image ? recipe.image : imgPlaceholder}
							alt={recipe.title}
							className="rounded-2 dishImage p-2 White shadow"
							style={{ maxWidth: "100%", height: "auto", minWidth: "200px" }}
						/>
					</Link>

					{/* Text Container - Allow it to stack underneath on small screens */}
					<div className="White p-2 rounded-2 shadow ms-md-2 mt-2 mt-md-0 w-100 h-100  d-flex flex-column  ">
						<div className="d-flex justify-content-between align-items-center mh-30">
							<h2 className="no-line-break">{recipe.title}</h2>
							{recipe.user.userId == user.id && (
								<div className="dropdown">
									<button
										className="White border-0 fs-4 ms-auto dropdown-toggle btn-no-caret"
										id="dropdownMenuButton"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<FontAwesomeIcon icon={faEllipsisVertical} />
									</button>
									<ul className="dropdown-menu light" aria-labelledby="dropdownMenuButton">
										<li className="px-2 rounded-2">
											<button className="dropdown-item light rounded-1" disabled>
												Modify
											</button>
										</li>
										<li className="px-2 rounded-1">
											<button className="dropdown-item light rounded-1" onClick={handleDelete}>
												Delete
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>

						<p className="m-0 recipeDescription">{recipe.description}</p>
						<p className="m-0 lead text-bgdark italic fs-6">Ingredients: {recipe.ingredients}</p>

						<div className="mt-auto d-flex align-items-center ">
							<Likes recipe={recipe} />
							<FavoriteButton recipe={recipe} />
							<Link to={`/Recipe/${recipe.recipeId}`} className="text-decoration-none p-0 m-0">
								<button className="btn btn-outline-bgdark rounded-2 ms-3">Comments</button>
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

SingleRecipe.propTypes = {
	recipe: PropTypes.object.isRequired,
};

export default SingleRecipe;
