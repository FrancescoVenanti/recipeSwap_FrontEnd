import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgPlaceholder from "../../../../assets/dishPlaceholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../../../Redux/Slices/favoriteSlice";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
	console.log(recipe);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user.id);
	const token = useSelector((state) => state.auth.token);
	const favorites = useSelector((state) => state.favorites.items);
	const ProductId = recipe.recipeId;

	// Introducing a local state to manage favorite button text dynamically
	const [isFavorited, setIsFavorited] = useState(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	// Effect hook to update local `isFavorited` state whenever the `favorites` state changes
	useEffect(() => {
		setIsFavorited(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	}, [favorites, recipe.recipeId]);

	const handleFavorites = () => {
		console.log("handleFavorites called");
		dispatch(addFavorite({ userId, ProductId, token }));
		setIsFavorited(!isFavorited);
	};

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

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
				<div className="rounded-2 d-flex justify-content-center align-items-center flex-column flex-md-row recipeContainer">
					<img
						src={imgPlaceholder}
						alt={recipe.title}
						className="rounded-2 dishImage p-2 White shadow"
						style={{ maxWidth: "100%", height: "auto" }}
					/>
					{/* Text Container - Allow it to stack underneath on small screens */}
					<div className="White p-2 rounded-2 shadow ms-md-2 mt-2 mt-md-0 w-100 h-100 no-line-break d-flex flex-column">
						<h2 className="no-line-break">{recipe.title}</h2>
						<p className="m-0">{recipe.description}</p>
						<p className="m-0 lead text-black-50 italic fs-6">Ingredients: {recipe.ingredients}</p>
						<button
							onClick={() => handleFavorites()}
							className="btn bg-transparent fs-4 align-self-end mt-auto"
						>
							{isFavorited ? (
								<FontAwesomeIcon icon={faHeart} className="text-highlight" />
							) : (
								<FontAwesomeIcon icon={faHeart} />
							)}
						</button>
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
