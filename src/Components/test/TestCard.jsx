import { useState } from "react";

const TestCard = () => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch("https://localhost:44380/api/Users");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log(data);
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<>
			<div>
				<button onClick={fetchData}>Fetch Data</button>
				{data.map((user) => {
					return (
						<div className="my-4 row" key={user.UserID}>
							<div className="me-2 col-4">
								<h2>{user.Username}</h2>
								{user.Recipes.length === 0 ? (
									<p className="text-danger fs-4">Nessuna ricetta</p>
								) : (
									<p className="text-success fs-4">Ricette</p>
								)}
							</div>
							<div className="col-7">
								{user.Recipes.map((recipe, index) => {
									return (
										<div className="text-start mb-2 bg-light shadow rounded-2 fs-4 p-3" key={index}>
											<p className="text-primary">
												Titolo: <span className="text-black">{recipe.Title}</span>{" "}
											</p>
											<p className="text-primary">
												Descrizione: <span className="text-black">{recipe.Description}</span>
											</p>
											<p className="text-primary lead fs-6">
												Ingredienti:{" "}
												<span className="lead text-black fs-6">{recipe.Ingredients}</span>
											</p>
											<p className="text-primary ">
												Istruzioni: <span className="text-black">{recipe.Instructions}</span>
											</p>
										</div>
									);
								})}
							</div>
							<hr />
						</div>
					);
				})}
			</div>
		</>
	);
};
export default TestCard;
