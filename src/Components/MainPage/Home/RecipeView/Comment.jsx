/* eslint-disable react/prop-types */
import { useState } from "react";
import fetchWithToken from "../../../../Redux/interceptor";

const Comment = ({ userId, recipeId }) => {
	const [text, setText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = localStorage.getItem("token");

	const postComment = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetchWithToken("https://localhost:7026/api/comments", token, {
				// Assuming the first argument is the URL and the second is the token
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userId,
					recipeId: recipeId,
					Comment1: text,
				}),
			});

			const data = await response.json(); // It's good to handle JSON parsing outside the condition to catch any parsing errors

			if (!response.ok) {
				throw new Error(data.message || "Network response was not ok");
			}

			// Handle success response here. For example, clear the form or provide user feedback.
			setText("");
			console.log("Comment posted successfully", data); // It might be helpful to log the response data for debugging or user feedback
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postComment();
		window.location.reload();
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="d-flex align-items-center">
				<input
					type="text"
					className="form-control me-2 White"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Write your comment..."
					disabled={isLoading}
				/>
				<button type="submit" className="btn btn-outline-green" disabled={isLoading}>
					Send
				</button>
			</form>
			{error && <p>Error: {error}</p>}
		</div>
	);
};

export default Comment;
