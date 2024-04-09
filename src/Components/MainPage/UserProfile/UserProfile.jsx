import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import SingleRecipe from "../Home/SingleRecipe/SingleRecipe";
import { updateUserProfilePicture } from "../../../Redux/Slices/authSlice";

const UserProfile = () => {
	//TODO change: dispatch all the users, confront it with the user id and then use that user

	const user = useSelector((state) => state.auth.user);

	const recipe = useSelector((state) => state.recipes.recipes);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();

	const fileInputRef = useRef(null);

	const handleProfilePictureClick = () => {
		fileInputRef.current.click(); // Trigger file input when profile picture is clicked
	};
	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		// Assuming you store the access token in the Redux state as well

		try {
			const response = await fetch(`https://localhost:7026/api/Users/updateProfilePicture/${user.id}`, {
				method: "POST",
				body: formData,
				headers: {
					// If your backend expects a bearer token for authentication,
					// you should include it in the request headers.
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const updatedUser = await response.json();
			console.log(updatedUser);
			await dispatch(updateUserProfilePicture(updatedUser.profilePicture));

			console.log(user.profilePicture);
			//reload the page

			alert("Profile picture updated successfully");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to upload the image");
		}
	};

	const userRecipes = recipe.filter((recipe) => recipe.user.userId === user.id);

	const defaultProfilePicture = "https://via.placeholder.com/300";
	return (
		<div>
			<div className="d-flex flex-column flex-md-row align-items-center d-md-flex">
				<div className="mx-auto">
					<h5 className="display-4 text-green">{user.username}</h5>
					<p className="">
						Name: {user.firstName} {user.lastName}
					</p>
					<p className="">Kiwi member since: {user.registrationDate}</p>
					<p className={` ${user.verifiedEmail ? "text-green" : "text-highlist"}`}>
						Email: {user.email} {/* {user.verifiedEmail ? "verified" : "not verified"} */}
					</p>
					<p className="">
						Password: ******** <FontAwesomeIcon icon={faPencil} />
					</p>
				</div>

				<img
					src={user.profilePicture || defaultProfilePicture}
					className="ms-md-auto mx-auto mx-md-0 mt-3 imgfluid rounded-circle order-first order-md-last mb-3 mb-md-0 border border-3 border-green"
					alt="Profile"
					onClick={handleProfilePictureClick}
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
			<div className="mt-4 text-center">
				<h4 className="text-green">Latest recipes</h4>
				<div className="row g-2">
					{userRecipes.map((recipe) => (
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
