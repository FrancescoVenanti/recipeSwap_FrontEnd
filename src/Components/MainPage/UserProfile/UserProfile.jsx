import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import SingleRecipe from "../Home/SingleRecipe/SingleRecipe";
import { fetchUserWithRecipes } from "../../../Redux/Slices/usersSlice"; // Adjust imports as necessary
import { updateUserProfilePicture } from "../../../Redux/Slices/authSlice";

const UserProfile = () => {
	const { id } = useParams();
	console.log(id);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const authUserId = useSelector((state) => state.auth.user.id);
	console.log(authUserId);

	useEffect(() => {
		// Fetch user data based on the id parameter
		dispatch(fetchUserWithRecipes({ userId: id, token }));
	}, [id, dispatch, token]);

	const fetchedUserData = useSelector((state) => state.user.userDetails); // Adjust based on where you store fetched user data
	console.log(fetchedUserData);

	const fileInputRef = useRef(null);

	const handleProfilePictureClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch(`https://localhost:7026/api/Users/updateProfilePicture/${id}`, {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const updatedUser = await response.json();
			dispatch(updateUserProfilePicture(updatedUser.profilePic));
			alert("Profile picture updated successfully");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to upload the image");
		}
	};

	const defaultProfilePicture = "https://via.placeholder.com/300";

	return (
		<div>
			{/* User info and image */}
			<div className="d-flex flex-column flex-md-row align-items-center d-md-flex">
				<div className="mx-auto">
					<h5 className="display-4 text-green">{fetchedUserData.username}</h5>
					{authUserId == id && (
						<>
							<p>
								Name: {fetchedUserData.firstName} {fetchedUserData.lastName}
							</p>

							<p>Kiwi member since: {fetchedUserData.registrationDate}</p>
							<p className={fetchedUserData.verifiedEmail ? "text-green" : "text-highlight"}>
								Email: {fetchedUserData.email}
							</p>
							<p>
								Password: ******** <FontAwesomeIcon icon={faPencil} />
							</p>
						</>
					)}
				</div>

				<img
					src={fetchedUserData.profilePicture || defaultProfilePicture}
					className="ms-md-auto mx-auto mx-md-0 mt-3 img-fluid rounded-circle order-first order-md-last mb-3 mb-md-0 border border-3 border-green"
					alt="Profile"
					onClick={authUserId == id ? handleProfilePictureClick : null}
					style={{
						cursor: "pointer",
						maxWidth: "350px",
						maxHeight: "350px",
						aspectRatio: "1/1",
						objectFit: "cover",
					}}
				/>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleFileChange}
					accept="image/*"
				/>
			</div>

			{/* Recipes */}
			<div className="mt-4 text-center">
				<h4 className="text-green">Latest recipes</h4>
				<div className="row g-2">
					{fetchedUserData.recipes.map((recipe) => (
						<div key={recipe.recipeId} className="col-12 text-start">
							<SingleRecipe recipe={recipe} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
