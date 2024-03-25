import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../Redux/Slices/RecipesSlice";
import { useEffect } from "react";

const Recipes = () => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes.recipes);
	console.log(recipes);
	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	return (
		<div>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<p key={recipe.RecipeID}>{recipe.Title}</p>
			))}
		</div>
	);
};
export default Recipes;
