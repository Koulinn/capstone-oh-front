import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import UserMenu from "./UserMenu";

const logoURL =
    "https://res.cloudinary.com/koulin/image/upload/v1634995832/OneHealth/Website/logoOH_fskezn.svg";

function NavigationBar({ history }) {
    const user = useSelector((s) => s.user);
    const { isLogged } = user;
    const isMobile = useMediaQuery("(max-width:640px)");
    const { avatar, name, surname } = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeHistory = (path) => {
        history.push(path);
    };
    return (
        <Navbar
            id="topNavigation"
            bg="transparent"
            className="w-100 container d-flex justify-content-between align-items-center"
            expand="sm"
        >
            <div
                className="logo"
                style={{ fontSize: isMobile ? "1.75rem" : "" }}
                onClick={() => changeHistory("/")}
            >
                <img src={logoURL} className="py-3 pr-3" alt="logo" />
                <>OneHealth</>
            </div>

            {!isLogged ? (
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink
                                to="/login"
                                activeClassName="active"
                                className={
                                    "flex-center-center mr-sm-3 " +
                                    (isMobile && " mb-3")
                                }
                            >
                                Login
                            </NavLink>

                            <Button
                                className={
                                    "px-4 " +
                                    (isMobile ? " align-self-center" : "")
                                }
                                style={{ width: "160px" }}
                                onClick={() => changeHistory("/register")}
                            >
                                Join now
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </>
            ) : (
                <div
                    className="d-flex justify-content-center"
                    id="fade-button"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <Avatar
                        data-hj-suppress
                        src={avatar}
                        alt={name + " " + surname}
                        className="cursor-pointer"
                    />
                    <Typography
                        data-hj-suppress
                        className="d-none ml-3 d-md-flex align-items-center cursor-pointer"
                    >{`${name} ${surname}`}</Typography>
                </div>
            )}
            <UserMenu
                handleClick={handleClick}
                anchorEl={anchorEl}
                handleClose={handleClose}
                open={open}
            />
        </Navbar>
    );
}

export default withRouter(NavigationBar);
