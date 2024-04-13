/* eslint-disable react/prop-types */
import { useState } from "react";
import imgPlaceholder from "../../../assets/dishPlaceholder.webp";
import FavoriteButton from "../../../Components/GlobalComponents/FavoriteButton";
import { Link } from "react-router-dom";
import Likes from "../../GlobalComponents/Likes";
import { useSelector } from "react-redux";

const TopLikedRecipe = ({ recipe, index }) => {
	const [isHovered, setIsHovered] = useState(false);
	const recipeId = recipe.recipeId;
	const recipes = useSelector((state) => state.recipes.recipes);
	recipe = recipes.find((recipe) => recipe.recipeId === recipeId);

	return (
		<>
			<div className="col-12 mt-4">
				{/* Image Container - Make it full width on small screens and automatically adjust on larger screens */}
				<div className={`rounded-2 position-relative`} onMouseLeave={() => setIsHovered(false)}>
					<img
						src={recipe.image ? recipe.image : imgPlaceholder}
						alt={recipe.title}
						className="rounded-2 dishImage p-2 White shadow"
						style={{ maxWidth: "100%", height: "auto" }}
						onMouseEnter={() => setIsHovered(true)}
					/>
					<p className={`num-award ${isHovered && "num-award-animation"}`}>{index + 1}°</p>
					{isHovered && (
						<Link to={`/Recipe/${recipe.recipeId}`} className="text-decoration-none p-0 m-0 h-100">
							<div className="White bg-opacity-50 p-2 rounded-2 shadow w-100 h-100 position-absolute top-0 end-0 me-1 text-center d-flex justify-content-center">
								<h2 className="display-6 fs-4 my-auto fw-bold">{recipe.title}</h2>
								<div className=" fs-4 position-absolute ms-2 start-0 bottom-0 mb-2 text-green">
									<Likes recipe={recipe} />
								</div>
								<div className="position-absolute me-1 end-0 bottom-0 mb-1">
									<FavoriteButton recipe={recipe} />
								</div>
							</div>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default TopLikedRecipe;
