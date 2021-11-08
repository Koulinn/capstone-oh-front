import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";

const logoURL =
  "https://res.cloudinary.com/koulin/image/upload/v1634995832/OneHealth/Website/logoOH_fskezn.svg";

function NavigationBar({ history }) {
  const user = useSelector((s) => s.user);
  const { isLogged } = user;
  const isMobile = useMediaQuery("(max-width:640px)");
  const {avatar, name, surname} = user

  const changeHistory = (path) => {
    history.push(path);
  };
  return (
    <Navbar
      id="topNavigation"
      bg="transparent"
      className="w-100 container d-flex justify-content-lg-between align-items-center"
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

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isLogged && (
            <NavLink
              to="/login"
              activeClassName="active"
              className={"flex-center-center mr-sm-3 " + (isMobile && " mb-3")}
            >
              Login
            </NavLink>
          )}
          {isLogged ? (
            <div className="d-flex justify-content-center">
                {!isMobile && <>
                    <Avatar src={avatar} alt={name + ' ' + surname}/>
                    <Typography className="ml-3 d-flex align-items-center">{`${name} ${surname}`}</Typography>
                </>}
            </div>
          ) : (
            <Button className="px-4" onClick={() => changeHistory("/register")}>
              Join now
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(NavigationBar);
