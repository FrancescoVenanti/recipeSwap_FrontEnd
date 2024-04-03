import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from "../../../../Redux/Slices/RecipesSlice"; // Update the import path as needed

const NewRecipe = () => {
	const token = useSelector((state) => state.auth.token);
	console.log("token ", token);
	const userId = useSelector((state) => state.auth.user.id);
	console.log("user ", userId);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [steps, setSteps] = useState([""]);
	const dispatch = useDispatch();

	const addStep = () => setSteps([...steps, ""]);

	const updateStep = (index, value) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	};

	const deleteStep = (index) => {
		const newSteps = [...steps];
		newSteps.splice(index, 1);
		setSteps(newSteps);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const instructions = steps.join("|||"); // Combine steps into one string

		const recipeData = {
			UserId: parseInt(userId, 10), // Convert userId to number
			Title: title,
			Description: description,
			Ingredients: ingredients,
			Instructions: instructions,
			//TODO Image field can be handled here when ready
		};
		console.log("recipeData ", recipeData);
		dispatch(postRecipe({ token, recipeData }));
	};

	return (
		<div className="rounded-3 p-3 White shadow">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					className="form-control"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="Description"
					className="form-control mt-2"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<textarea
					placeholder="Ingredients"
					className="form-control mt-2"
					value={ingredients}
					onChange={(e) => setIngredients(e.target.value)}
				/>

				{steps.map((step, index) => (
					<FormGroup key={index} className="mt-2">
						<label>Step {index + 1}</label>
						<div className="d-block d-lg-flex mt-2">
							<input
								type="text"
								placeholder="Add a new step"
								className="form-control me-lg-0"
								value={step}
								onChange={(e) => updateStep(index, e.target.value)}
							/>
							<button
								type="button"
								className="btn btn-outline-danger ms-2 mt-2 mt-lg-0"
								onClick={() => deleteStep(index)}
							>
								Delete
							</button>
						</div>
					</FormGroup>
				))}
				<div className="d-flex flex-column align-items-center justify-content-center">
					<button type="button" className="btn btn-outline-success mt-2 mx-auto" onClick={addStep}>
						Add Step
					</button>

					{/* <input type="file" className="form-control mt-2" /> Placeholder for future image upload */}
					<button type="submit" className="btn btn-success mt-2">
						Create Recipe
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewRecipe;
