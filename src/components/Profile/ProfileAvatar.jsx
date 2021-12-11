import React from "react";
import { Avatar, Badge } from "@mui/material";
import requests from "../../lib/requests-authenticated.js";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

const { uploadAvatar } = requests;

export default function ProfileAvatar({
    medical_tests_requested,
    name,
    avatar,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const updateAvatar = async (e) => {
        try {
            setIsLoading(true);
            const file = e.target.files[0];
            const form = new FormData();
            form.append("avatar", file);
            await uploadAvatar(form);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            invisible={medical_tests_requested?.length > 0 ? false : true}
        >
            <label htmlFor="avatar" className="cursor-pointer">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <Avatar alt={name + " picture"} src={avatar} />
                )}
            </label>
            <input
                className="d-none position-absolute"
                id="avatar"
                type="file"
                onChange={(e) => updateAvatar(e)}
            />
        </Badge>
    );
}
