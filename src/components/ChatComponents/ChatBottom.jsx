import React, { useState } from "react";
import { MdSend, MdOutlineAttachment } from "react-icons/md";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useSelector } from "react-redux";
import { socket } from "../../views/Chat/Chat";
import regRequests from "../../lib/requests-handlers";
import Button from "@mui/material/Button";
import { MdClose } from "react-icons/md";

const { uploadCloudinary } = regRequests;

function ChatBottom() {
    const userId = useSelector((s) => s.user._id);
    const [imgPreview, setImgPreview] = useState(null);

    const showImagePreview = (file) => {
        const objectURL = URL.createObjectURL(file);
        setImgPreview(objectURL);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const fileObj = e.target[2].files[0];
        let imgUrl = null;
        if (fileObj) {
            imgUrl = await uploadCloudinary(fileObj);
        }
        const message = {
            senderID: userId,
            senderRole: "user",
            text: e.target[0].value,
            files: imgUrl,
        };

        const payload = {
            message,
            roomID: userId,
        };
        socket.emit("newMessage", payload);
        setImgPreview(null);
        document.getElementById("chatForm").reset();
    };

    const removeImg = () => {
        setImgPreview(null);
    };

    return (
        <div className="border-top chatInput-wrapper">
            {imgPreview ? (
                <div>
                    <div
                        className="position-relative"
                        style={{ width: "fit-content" }}
                    >
                        <img
                            className="mx-3 mt-3 position-relative"
                            src={imgPreview}
                            alt=""
                            width="128"
                            height="80"
                        />

                        <div
                            className="position-absolute d-flex flex-center-center removeImg cursor-pointer"
                            onClick={() => removeImg()}
                        >
                            <MdClose />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <form
                id="chatForm"
                onSubmit={sendMessage}
                className=" d-flex justify-content-between align-items-center"
            >
                <TextareaAutosize
                    className="text-area-wrapper my-3 px-2"
                    maxRows={4}
                    aria-label="minimum height"
                    placeholder="Enter your message"
                />
                <div
                    className="sendAttachment-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mx-3"
                    onChange={(e) => showImagePreview(e.target.files[0])}
                >
                    <label htmlFor="fileField" className="cursor-pointer m-0">
                        <MdOutlineAttachment />
                    </label>
                    <input type="file" id="fileField" className="d-none" />
                </div>
                <Button type="submit" className="px-0">
                    <div className="sendMessage-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mr-3">
                        <MdSend />
                    </div>
                </Button>
            </form>
        </div>
    );
}

export default ChatBottom;
