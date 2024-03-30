/* eslint-disable react/prop-types */
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { addFavorite, fetchFavorites } from "../../Redux/Slices/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

const FavoriteButton = ({ recipe }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?.id);
	const token = useSelector((state) => state.auth.token);
	const favorites = useSelector((state) => state.favorites.items);
	const ProductId = recipe.recipeId;
	const [isFavorited, setIsFavorited] = useState(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	useEffect(() => {
		setIsFavorited(favorites.some((favorite) => favorite.recipeId === recipe.recipeId));
	}, [favorites, recipe.recipeId, dispatch]);

	//todo migliorare
	//toppi dispatch ma per ora e' lunico modo che ho per far aggiornare i component al momento giusto
	const handleFavorites = async () => {
		console.log("handleFavorites called");
		dispatch(addFavorite({ userId, ProductId, token }));
		await dispatch(fetchFavorites({ userId, token }));
		if (isFavorited) {
			setIsFavorited(false);
		} else {
			setIsFavorited(true);
		}
		await dispatch(fetchFavorites({ userId, token }));
	};
	return (
		<button
			onClick={() => handleFavorites()}
			className="btn bg-transparent fs-4 position-absolute end-0 me-1 bottom-0 mb-1"
		>
			{isFavorited ? (
				<FontAwesomeIcon icon={faHeart} className="text-highlight" />
			) : (
				<FontAwesomeIcon icon={faHeart} />
			)}
		</button>
	);
};

export default FavoriteButton;