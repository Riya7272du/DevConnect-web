import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;

    const messagesEndRef = useRef(null);  // Ref for scrolling to the bottom

    const fetchChatMessages = async () => {
        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
            withCredentials: true,
        });

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text, createdAt } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
                createdAt,
            };
        });
        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });
        socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
            setMessages((messages) => [...messages, { firstName, lastName, text, createdAt }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName: user.firstName, lastName: user.lastName, userId, targetUserId, text: newMessages });
        setNewMessages("");
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Customize this for desired formatting
    };

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // This effect runs whenever the messages array is updated

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-2.5">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50">
                                - {msg.createdAt ? formatTimestamp(msg.createdAt) : "Loading..."}
                            </time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />  {/* This empty div will help in scrolling */}
            </div>

            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)}
                    className="flex-1 border border-gray-500 text-gray rounded p-2" />
                <button onClick={sendMessage}
                    className="btn btn-secondary">Send</button>
            </div>
        </div>
    );
}

export default Chat;
