import PropTypes from "prop-types";

const ConversationList = ({ conversations, setActiveConversation, loading, error, userId }) => {
	{
		error && console.log(error);
	}
	return (
		<>
			{loading && <p>Loading...</p>}
			<div>
				{conversations.map(({ key, lastMessage }) => (
					<div
						key={key}
						onClick={() => setActiveConversation(key)}
						style={{ cursor: "pointer" }}
						className="border p-1 ps-2 rounded-2 mb-2 d-flex align-items-center"
					>
						<img
							src={
								lastMessage.senderUserId === userId
									? lastMessage.receiverUser.profilePicture
									: lastMessage.senderUser.profilePicture
							}
							alt="profile"
							className="rounded-circle me-2"
							style={{ width: "50px", aspectRatio: "1" }}
						/>
						<div>
							<p className="m-0 text-green fs-5">
								{lastMessage.senderUserId === userId
									? lastMessage.receiverUser.username
									: lastMessage.senderUser.username}
							</p>
							<p className="m-0">
								{lastMessage.senderUserId === userId ? "You" : lastMessage.senderUser.username} {": "}{" "}
								{lastMessage.messageContent}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ConversationList;

ConversationList.propTypes = {
	conversations: PropTypes.array,
	setActiveConversation: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.string,
	userId: PropTypes.number,
};
