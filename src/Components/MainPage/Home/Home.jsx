import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../../../Redux/Slices/RecipesSlice";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
				<h1>Home {user.username}</h1>
				<div className="row g-2">
					{recipes.map((recipe) => (
						<div key={recipe.recipeId} className="col-12">
							<div className="dark p-2 rounded-2">
								<h2>{recipe.title}</h2>
								<p>{recipe.description}</p>
								<p>{recipe.ingredients}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default Home;
