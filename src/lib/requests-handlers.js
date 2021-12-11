import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const registerWithEmail = async (data) => {
    try {
        const res = await axios.post(`${URL}/user`, data);
        return res;
    } catch (error) {
        return false;
    }
};
const login = async (data) => {
    try {
        const res = await axios.post(`${URL}/user/login`, data);
        return res;
    } catch (error) {
        return false;
    }
};

const medicalTestsSuggestions = async (inputValue) => {
    try {
        const res = await axios.get(`${URL}/hospital?testName=${inputValue}`);
        return res;
    } catch (error) {
        return false;
    }
};

const CLOUD_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_NAME;

const uploadCloudinary = async (file) => {
    try {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", CLOUD_PRESET);
        form.append("cloud_name", CLOUD_NAME);
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "post",
                body: form,
            }
        );
        if (res.status === 200) {
            const data = await res.json();
            return data.secure_url;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const regRequests = {
    registerWithEmail: registerWithEmail,
    login: login,
    medicalTestsSuggestions: medicalTestsSuggestions,
    uploadCloudinary: uploadCloudinary,
};

export default regRequests;
