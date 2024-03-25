import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import RecipesSlice from "./Slices/RecipesSlice";
// Importa altri slice reducers qui

const rootReducer = combineReducers({
	// Le chiavi qui rappresentano le parti dello stato globale
	auth: authSlice,
	recipes: RecipesSlice,
	// Aggiungi altri slice reducers qui come necessario
});

export default rootReducer;
