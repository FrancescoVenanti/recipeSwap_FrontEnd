import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import SingleRecipe from "../Home/SingleRecipe/SingleRecipe";

const UserProfile = () => {
	//TODO change: dispatch all the users, confront it with the user id and then use that user
	const user = useSelector((state) => state.auth.user);
	const recipe = useSelector((state) => state.recipes.recipes);

	const fileInputRef = useRef(null);

	const handleProfilePictureClick = () => {
		fileInputRef.current.click(); // Trigger file input when profile picture is clicked
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		console.log(file);
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
					className="ms-md-auto mx-auto mx-md-0 mt-3 imgfluid rounded-circle mw-100 order-first order-md-last mb-3 mb-md-0"
					alt="Profile"
					onClick={handleProfilePictureClick}
					style={{ cursor: "pointer" }}
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
