import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";


export default function NavBar() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#">Home</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

