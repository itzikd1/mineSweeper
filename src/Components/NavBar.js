import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";


export default function NavBar() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#instuction">Instruction</Nav.Link>
                        <Nav.Link href="#about">About Me</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

