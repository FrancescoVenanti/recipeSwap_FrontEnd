import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk per la registrazione
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
	try {
		const response = await fetch("https://localhost:7026/api/Users/Register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		let data = await response.json();

		if (response.status === 200) {
			return { ...data };
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		console.log("Error", e.response.data);
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

export const loginUser = createAsyncThunk("auth/login", async ({ username, pswHash }, { rejectWithValue }) => {
	try {
		const response = await fetch("https://localhost:7026/api/Users/Login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, pswHash }),
		});

		let data = await response.json();

		if (response.ok) {
			// Puoi decidere di salvare il token JWT ricevuto in localStorage qui

			return data;
		} else {
			return rejectWithValue(data);
		}
	} catch (error) {
		console.error("Error:", error);
		return rejectWithValue(error.toString());
	}
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("https://localhost:7026/api/Users/Logout", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
		});
		let data = await response.json();
		if (response.ok) {
			// Puoi decidere di salvare il token JWT ricevuto in localStorage qui

			return data;
		} else {
			return rejectWithValue(data);
		}
	} catch (error) {
		console.error("Error:", error);
		return rejectWithValue(error.toString());
	}
});

// Slice per la gestione dell'autenticazione
export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null,
		isError: false,
		isSuccess: false,
		isLoading: false,
		message: "",
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload.message;
				state.user = null;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload; // Assumi che l'action ritorni i dettagli dell'utente
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload ? action.payload : "Login fallito";
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.token = null;
			});
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
