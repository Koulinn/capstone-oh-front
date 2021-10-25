import React from 'react'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router";




const logoURL = 'https://res.cloudinary.com/koulin/image/upload/v1634995832/OneHealth/Website/logoOH_fskezn.svg'

function NavigationBar({history}) {

    const changeHistory=(path)=>{
        history.push(path)
    }
    return (
        <Navbar id="topNavigation" bg="transparent" className="w-100 container d-flex justify-content-lg-between align-items-center" expand="lg">
            <div className="logo" onClick={()=>changeHistory('/')}>
                <img src={logoURL} className="py-3 pr-3" />
                OneHealth
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/login"  activeClassName="active" className="flex-center-center">Login</NavLink>
                    <NavLink to="/register" activeClassName="active" className="ml-3 flex-center-center">Register</NavLink>
                    <NavLink to="/chat" activeClassName="active" className="mx-3 flex-center-center">Open chat</NavLink>
                    <Button onClick={()=>changeHistory('/booking')}>Book medical test</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(NavigationBar)
