import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../Redux/Slices/messagesSlice";
import ActiveConversation from "./ActiveConversation";
import ConversationList from "./ConversationList";

const Messages = () => {
	const [activeConversationKey, setActiveConversationKey] = useState(null);
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages.items);
	const loading = useSelector((state) => state.messages.loading);
	const error = useSelector((state) => state.messages.error);
	const userId = useSelector((state) => state.auth.user.id);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		dispatch(fetchMessages({ userId, token }));
	}, [dispatch, userId, token]);

	const groupedMessages = messages.reduce((acc, message) => {
		const key = [message.senderUserId, message.receiverUserId].sort().join("-");
		acc[key] = acc[key] || [];
		acc[key].push(message);
		return acc;
	}, {});

	const conversations = Object.entries(groupedMessages).map(([key, messages]) => ({
		key,
		messages,
		lastMessage: messages[messages.length - 1],
	}));

	const closeActiveConversation = () => {
		setActiveConversationKey(null);
	};

	return (
		<div className="container">
			<div className="row">
				<h1 className="text-green">Messages</h1>
				<div className="col-4">
					<ConversationList
						conversations={conversations}
						setActiveConversation={setActiveConversationKey}
						loading={loading}
						error={error}
						userId={userId}
					/>
				</div>
				<div className="col-8">
					<ActiveConversation
						activeConversation={activeConversationKey ? groupedMessages[activeConversationKey] : null}
						userId={userId}
						closeConversation={closeActiveConversation}
					/>
				</div>
			</div>
		</div>
	);
};

export default Messages;
