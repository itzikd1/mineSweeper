import {Container, Navbar} from "react-bootstrap";
import React from "react";


export default function NavBarComponent() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand data-testid='navbar' href="#">Home</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}
