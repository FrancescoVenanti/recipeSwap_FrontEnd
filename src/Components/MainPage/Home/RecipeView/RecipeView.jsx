import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import imgPlaceholder from "../../../../assets/dishPlaceholder.webp";
import userPlaceholder from "../../../../assets/userPlaceholder.png";
import Comment from "./Comment";
import { useEffect } from "react";
import { fetchRecipes } from "../../../../Redux/Slices/RecipesSlice";

const RecipeView = () => {
	const allRecipes = useSelector((state) => state.recipes.recipes);
	const token = useSelector((state) => state.auth.token);
	const queryId = window.location.pathname.split("/")[2];
	const recipe = allRecipes.find((recipe) => recipe.recipeId == queryId);
	const instructions = recipe.instructions.split("|||");
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRecipes(token));
	}, [dispatch, token]);

	return (
		<div className="text-center">
			<h2 className="display-4 text-green text-start">{recipe.title}</h2>
			<div className="shadow overflow-hidden w-100 rounded-3 mt-2">
				<motion.img
					src={recipe.image == "" ? imgPlaceholder : recipe.image}
					alt={recipe.title}
					className="img-fluid"
					whileHover={{ scale: 1.5 }} // Adjust scale value as needed
					transition={{ duration: 0.3 }}
				/>
			</div>
			<p className="text-bgLight mt-3 fs-5">{recipe.description}</p>
			<p className="text-beige mt-3 lead">Ingredients: {recipe.ingredients}</p>
			<div className="text-start mt-4">
				<h3 className="text-green ">Instructions</h3>
				<ul className="text-start">
					{instructions.map((instruction, index) => (
						<li key={index} className="fs-5 mt-2">
							{instruction}
						</li>
					))}
				</ul>
			</div>
			<div className="d-flex justify-content-center">
				<div className="text-start mt-4 comments ">
					<h3 className="text-green text-center">Comments</h3>
					{recipe.comments &&
						recipe.comments.map((comment, index) => (
							<div key={index} className=" mt-2 White px-2 py-1 rounded-2">
								{user.id !== comment.userId ? (
									<div className="d-flex align-items-center ">
										<img
											src={
												comment.profilePicture == null
													? userPlaceholder
													: comment.profilePicture
											}
											alt={comment.username}
											className="rounded-circle"
											style={{ width: "30px" }}
										/>
										<p className="text-beige m-0 ms-2 ">{comment.username}</p>
									</div>
								) : (
									<div className="d-flex align-items-center justify-content-end">
										<p className="text-beige m-0 me-2">You</p>
									</div>
								)}
								<div className={`d-flex  ${user.id == comment.userId && "justify-content-end"}`}>
									<p
										className={`p-2 m-0 rounded-2 White w-100 ${
											user.id == comment.userId && " text-end"
										}`}
									>
										{comment.comment1}
									</p>
								</div>
							</div>
						))}
					<div className="my-3">
						<Comment userId={user.id} recipeId={recipe.recipeId} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default RecipeView;
