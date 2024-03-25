import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authentication from "./Components/Auth/Authentication";
import Recipes from "./Components/MainPage/Recipes/Recipes";

function App() {
	//come prendo roba dallo store redux?

	return (
		<div className="App">
			<header className="App-header">
				<h1>Prova</h1>
			</header>
			<Authentication />
			<Recipes />
		</div>
	);
}

export default App;
