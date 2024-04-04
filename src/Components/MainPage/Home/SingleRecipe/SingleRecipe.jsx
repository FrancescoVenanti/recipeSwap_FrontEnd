import imgPlaceholder from "../../../../assets/dishPlaceholder.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import PropTypes from "prop-types";
import FavoriteButton from "../../../GlobalComponents/FavoriteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

// Animation variants
const variants = {
	offscreen: {
		x: -100, // Start off-screen to the left
		opacity: 0,
	},
	onscreen: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};

const SingleRecipe = ({ recipe }) => {
	console.log(recipe);
	const user = useSelector((state) => state.auth.user);

	// Effect hook to update local `isFavorited` state whenever the `favorites` state changes

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<>
			<motion.div
				ref={ref}
				variants={variants}
				initial="offscreen"
				animate={inView ? "onscreen" : "offscreen"}
				className="col-12"
			>
				{/* Image Container - Make it full width on small screens and automatically adjust on larger screens */}
				<div className="rounded-2 d-flex justify-content-center align-items-center flex-column flex-md-row recipeContainer ">
					<img
						src={recipe.image ? recipe.image : imgPlaceholder}
						alt={recipe.title}
						className="rounded-2 dishImage p-2 White shadow"
						style={{ maxWidth: "100%", height: "auto" }}
					/>

					{/* Text Container - Allow it to stack underneath on small screens */}
					<div className="White p-2 rounded-2 shadow ms-md-2 mt-2 mt-md-0 w-100 h-100  d-flex flex-column  ">
						<div className="d-flex justify-content-between align-items-center mh-30">
							<h2 className="no-line-break">{recipe.title}</h2>
							{recipe.user.userId == user.id && (
								<div className="dropdown">
									<button
										className="text-bgdark bg-transparent border-0 fs-4 ms-auto dropdown-toggle btn-no-caret"
										id="dropdownMenuButton"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<FontAwesomeIcon icon={faEllipsisVertical} />
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li>
											<button className="dropdown-item">Modify</button>
										</li>
										<li>
											<button className="dropdown-item">Delete</button>
										</li>
									</ul>
								</div>
							)}
						</div>

						<p className="m-0 recipeDescription">{recipe.description}</p>
						<p className="m-0 lead text-bgdark italic fs-6">Ingredients: {recipe.ingredients}</p>

						<div className="mt-auto d-flex align-items-center ">
							<button className="btn bg-transparent text-green">
								<FontAwesomeIcon icon={faHeart} className="fs-4 text-highlight" />
							</button>
							<FavoriteButton recipe={recipe} />
							<button className="btn btn-outline-bgdark rounded-2 ms-3">Comments</button>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

SingleRecipe.propTypes = {
	recipe: PropTypes.object.isRequired,
};

export default SingleRecipe;
