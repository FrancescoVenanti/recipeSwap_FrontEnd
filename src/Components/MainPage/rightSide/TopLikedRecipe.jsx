/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../../Redux/Slices/favoriteSlice";
import imgPlaceholder from "../../../assets/dishPlaceholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const TopLikedRecipe = ({ recipe, index }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?.id);
	const token = useSelector((state) => state.auth.token);
	const favorites = useSelector((state) => state.favorites.items);
	const ProductId = recipe.recipeId;

	// Introducing a local state to manage favorite button text dynamically
	const [isFavorited, setIsFavorited] = useState(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	const [isHovered, setIsHovered] = useState(false);
	// Effect hook to update local `isFavorited` state whenever the `favorites` state changes
	useEffect(() => {
		setIsFavorited(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	}, [favorites, recipe.recipeId]);

	const handleFavorites = () => {
		console.log("handleFavorites called");
		dispatch(addFavorite({ userId, ProductId, token }));
		setIsFavorited(!isFavorited);
	};

	return (
		<>
			<div className="col-12 mt-4">
				{/* Image Container - Make it full width on small screens and automatically adjust on larger screens */}
				<div className={`rounded-2 position-relative`} onMouseLeave={() => setIsHovered(false)}>
					<img
						src={imgPlaceholder}
						alt={recipe.title}
						className="rounded-2 dishImage p-2 White shadow"
						style={{ maxWidth: "100%", height: "auto" }}
						onMouseEnter={() => setIsHovered(true)}
					/>
					<p className={`num-award ${isHovered && "num-award-animation"}`}>{index + 1}°</p>
					{isHovered && (
						<div className="bg-white bg-opacity-75 p-2 rounded-2 shadow w-100 h-100 position-absolute top-0 end-0 me-1 text-center d-flex justify-content-center">
							<h2 className="display-6 fs-4 my-auto">{recipe.title}</h2>
							<button className="btn bg-transparent fs-4 position-absolute ms-1 start-0 bottom-0 mb-1 text-green">
								<FontAwesomeIcon icon={faThumbsUp} /> {recipe.likes}
							</button>
							<button
								onClick={() => handleFavorites()}
								className="btn bg-transparent fs-4 position-absolute end-0 me-1 bottom-0 mb-1"
							>
								{isFavorited ? (
									<FontAwesomeIcon icon={faHeart} className="text-highlight" />
								) : (
									<FontAwesomeIcon icon={faHeart} />
								)}
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TopLikedRecipe;
