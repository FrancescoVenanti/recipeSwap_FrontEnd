import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../../Redux/Slices/favoriteSlice";

const Favourites = () => {
	const dispatch = useDispatch();
	const { items, status } = useSelector((state) => state.favorites);
	const userId = useSelector((state) => state.auth.user.id);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		if (userId && token) {
			dispatch(fetchFavorites({ userId, token }));
			console.log("aaaa");
			console.log(items);
		}
	}, [dispatch, userId, token]);

	if (status === "loading") return <div>Loading...</div>;

	return (
		<div>
			<h1>Wishlist</h1>
			<ul>
				{items.map((item) => (
					<li key={item.favoriteId}>{item.recipe.title}</li>
				))}
			</ul>
		</div>
	);
};

export default Favourites;
