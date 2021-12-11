import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import ChatHistory from "../../components/ChatComponents/ChatHistory";
import ChatHeader from "../../components/ChatComponents/ChatHeader";
import ChatBottom from "../../components/ChatComponents/ChatBottom";
import { CSSTransition } from "react-transition-group";
import useMediaQuery from "@mui/material/useMediaQuery";
import Waiting from "../../components/ChatComponents/Waiting";
import lib from "../../lib";

const {
    chatTimer: { chatTimer },
} = lib;

const ADDRESS = process.env.REACT_APP_API_URL;
export const socket = io(ADDRESS, { transports: ["websocket"] });

function Chat({ showChat, setShowChat }) {
    const [showWaiting, setShowWaiting] = useState(true);
    const user = useSelector((s) => s.user);
    const [currentMessageHistory, setCurrentMessageHistory] = useState([]);
    const isMobile = useMediaQuery("(max-width:640px)");

    useEffect(() => {
        socket.on("connection", () => {});
        socket.on("waitingUsers", (payload) => {});
        socket.on("joinChat", (payload) => {
            setShowWaiting(false);
            socket.emit("joinSupportAssistant", payload);
        });
    }, []);

    const updateChatMessages = (payload) => {
        setCurrentMessageHistory([...currentMessageHistory, payload]);
    };

    useEffect(() => {
        socket.on("recipientMessage", updateChatMessages);
        return () => {
            socket.off("recipientMessage", updateChatMessages);
        };
    }, [currentMessageHistory]);

    const requestAssistance = (user) => {
        delete user.refreshToken;
        setShowChat(!showChat);

        socket.emit("newUser", user);
    };

    return (
        <div>
            <div
                className={
                    "chat-wrapper d-flex align-items-center justify-content-center "
                }
            >
                {!isMobile && (
                    <div
                        className="d-flex w-100 align-items-center justify-content-center cursor-pointer"
                        onClick={() => requestAssistance(user)}
                    >
                        <MdOutlineChatBubbleOutline className="my-auto mr-3" />
                        <h4>Chat</h4>
                    </div>
                )}

                <CSSTransition
                    in={showChat}
                    timeout={chatTimer}
                    classNames="fade"
                    mountOnEnter={true}
                    unmountOnExit={true}
                    appear={true}
                >
                    <div className="chatDisplay-wrapper">
                        <div className="position-relative">
                            <ChatHeader setShowChat={setShowChat} />
                            {showWaiting ? (
                                <Waiting />
                            ) : (
                                <>
                                    <ChatHistory
                                        currentMessageHistory={
                                            currentMessageHistory
                                        }
                                    />
                                    <ChatBottom />
                                </>
                            )}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
}

export default Chat;
