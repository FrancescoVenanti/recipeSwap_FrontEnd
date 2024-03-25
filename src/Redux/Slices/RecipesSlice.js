import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("https://localhost:44380/api/Recipes");
		const recipes = await response.json();
		if (response.ok) {
			console.log(recipes);
			return recipes;
		} else {
			return rejectWithValue(recipes);
		}
	} catch (error) {
		console.error("Error:", error);
		return rejectWithValue(error.toString());
	}
});

export const RecipesSlice = createSlice({
	name: "recipes",
	initialState: {
		recipes: [],
		isLoading: false,
		isError: false,
		errorMessage: "",
	},
	// Aggiungi reducers qui
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.recipes = action.payload;
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
			});
	},
});
export default RecipesSlice.reducer;
