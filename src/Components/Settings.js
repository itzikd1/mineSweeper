import {Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React from "react";

export default function Settings() {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <InputGroup.Text>Board Width</InputGroup.Text>
                            <FormControl
                                placeholder="Width"
                                aria-label="Width"
                            />
                        </Row>
                    </Col>
                    <Col>
                        <InputGroup.Text>Board Height</InputGroup.Text>
                        <FormControl
                            placeholder="Height"
                            aria-label="Height"
                        />
                    </Col>
                    <Col>
                        <InputGroup.Text>Number Of Mines</InputGroup.Text>
                        <FormControl
                            placeholder="Mines"
                            aria-label="Mines"
                        />
                    </Col>
                    <Col>
                        <Form>
                            <Form.Check
                                id="switchEnabled"
                                type="switch"
                                label="Super Mode"
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


