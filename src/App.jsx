import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Authentication from "./Components/Auth/Authentication";
import Recipes from "./Components/MainPage/Recipes/Recipes";
import SidebarComponent from "./Components/SideBar/SidebarComponent";

function App() {
	//come prendo roba dallo store redux?

	return (
		<div className="App">
			<SidebarComponent />
			<div className="text-center">
				<h1>Prova</h1>

				<Authentication />
				<Recipes />
			</div>
		</div>
	);
}

export default App;
