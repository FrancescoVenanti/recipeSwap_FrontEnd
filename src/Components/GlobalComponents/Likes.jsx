/* eslint-disable react/prop-types */
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const Likes = ({ recipe }) => {
	console.log(recipe);
	const userId = useSelector((state) => state.auth.user.id);
	console.log(userId);
	const [isLiked, setIsLiked] = useState(recipe.likes.some((like) => like.userId === userId));
	const token = useSelector((state) => state.auth.token);

	const handleLike = async () => {
		try {
			const response = await fetch(
				`https://localhost:7026/api/Likes/?userId=${userId}&ProductId=${recipe.recipeId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Assuming you're using Bearer token authentication
					},
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Could not toggle like");
			}
			setIsLiked(!isLiked);
			// Handle successful like toggle here
			// For example, you might want to update component state to reflect the like status
			console.log("Success:", data.message);
		} catch (error) {
			console.error("Error:", error.message);
			// Optionally handle the error, such as displaying an error message to the user
		}
	};

	return (
		<div>
			<button className="btn bg-transparent text-green" onClick={handleLike}>
				{isLiked ? (
					<FontAwesomeIcon icon={fasFaHeart} className="fs-4 text-highlight" />
				) : (
					<FontAwesomeIcon icon={faHeart} className="fs-4 text-highlight " />
				)}
			</button>
		</div>
	);
};
export default Likes;
