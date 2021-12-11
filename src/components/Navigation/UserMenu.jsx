import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { withRouter } from "react-router-dom";
import { setUserLogOut } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

function UserMenu({ handleClick, anchorEl, handleClose, open, history }) {
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.clear();
        dispatch(setUserLogOut());
        history.push("/");
    };
    return (
        <div className="position-fixed">
            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history.push("/dashboard");
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Results</MenuItem>
                <MenuItem
                    onClick={() => {
                        history.push("/booking");
                        handleClose();
                    }}
                >
                    Book test
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        logout();
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default withRouter(UserMenu);
