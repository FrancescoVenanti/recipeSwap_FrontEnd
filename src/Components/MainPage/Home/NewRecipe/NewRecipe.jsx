import { useState } from "react";
import { FormGroup } from "react-bootstrap";

const NewRecipe = () => {
	const [steps, setSteps] = useState([""]);

	const addStep = () => {
		setSteps([...steps, ""]);
	};

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

	return (
		<div className="rounded-3 p-3 White shadow">
			<input type="text" placeholder="Title" className="form-control" />
			<textarea placeholder="Description" className="form-control mt-2"></textarea>
			<textarea placeholder="Ingredients" className="form-control mt-2"></textarea>

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
						{/* Delete Step Button */}
						<button
							className="btn btn-outline-highline ms-2 mt-2 mt-lg-0"
							onClick={() => deleteStep(index)}
						>
							Delete
						</button>
					</div>
				</FormGroup>
			))}
			<div className="d-flex flex-column align-items-center justify-content-center">
				<button className="btn btn-outline-green mt-2 mx-auto" onClick={addStep}>
					Add Step
				</button>

				<input type="file" className="form-control mt-2" />
				<button className="btn btn-outline-green mt-2">Create Recipe</button>
			</div>
		</div>
	);
};

export default NewRecipe;
