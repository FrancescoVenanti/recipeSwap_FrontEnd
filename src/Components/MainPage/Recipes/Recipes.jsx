import { useSelector } from "react-redux";
const Recipes = () => {
	const recipes = useSelector((state) => state.recipes.recipes);
	/* useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]); */
	console.log(recipes);

	/* const fetchData = async () => {
		try {
			const response = await fetchWithToken("https://localhost:7026/api/Recipes");
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				// Process your data
			} else {
				throw new Error(data.message || "An error occurred");
			}
		} catch (error) {
			console.error("Fetch Error:", error);
		}
	}; */

	return (
		<div>
			<h2>Recipes</h2>
			{recipes.map((recipe) => (
				<p key={recipe.RecipeID}>{recipe.Title}</p>
			))}
			<button>Fetch</button>
		</div>
	);
};
export default Recipes;
