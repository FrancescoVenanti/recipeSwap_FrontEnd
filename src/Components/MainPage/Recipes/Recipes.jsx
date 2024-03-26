import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../Redux/Slices/RecipesSlice";
import { useEffect } from "react";

const Recipes = () => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes.recipes);
	const token = useSelector((state) => state.auth.token);
	console.log(recipes);
	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	const fetchTest = async () => {
		console.log(token);
		const response = await fetch("https://localhost:7026/api/Recipes", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		console.log(data);
	};

	return (
		<div>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<p key={recipe.RecipeID}>{recipe.Title}</p>
			))}
			<button onClick={fetchTest}>Fetch</button>
		</div>
	);
};
export default Recipes;
