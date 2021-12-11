import React from "react";
import Container from "react-bootstrap/Container";

function Layout({ children }) {
    return (
        <Container className="overflow-hidden" fluid>
            <Container className="position-relative p-outside">
                {children}
            </Container>
        </Container>
    );
}

export default Layout;
