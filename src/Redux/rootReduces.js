import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import RecipesSlice from "./Slices/RecipesSlice";
import favoriteSlice from "./Slices/favoriteSlice";
import topLikedSlice from "./Slices/topLiked";
import searchSlice from "./Slices/searchSlice";
// Importa altri slice reducers qui

const rootReducer = combineReducers({
	// Le chiavi qui rappresentano le parti dello stato globale
	auth: authSlice,
	recipes: RecipesSlice,
	favorites: favoriteSlice,
	topLiked: topLikedSlice,
	search: searchSlice,
	// Aggiungi altri slice reducers qui come necessario
});

export default rootReducer;
