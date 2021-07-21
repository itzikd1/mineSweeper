import {Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {useBoard} from "../Context/GameProvidor";

export default function Settings({height, onChangeHeight, width, onChangeWidth, numOfMines, onChangeNumOfMines, numOfFlags}) {
    const game = useBoard();

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <InputGroup.Text>Board Width</InputGroup.Text>
                            <FormControl
                                placeholder="Width"
                                value={height}
                                onChange={(e) => onChangeHeight(e.target.value)}
                                aria-label="Width"
                            />
                        </Row>
                    </Col>
                    <Col>
                        <InputGroup.Text>Board Height</InputGroup.Text>
                        <FormControl
                            placeholder="Height"
                            value={width}
                            onChange={(e) => onChangeWidth(e.target.value)}
                            aria-label="Height"
                        />
                    </Col>
                    <Col>
                        <InputGroup.Text>Number Of Mines</InputGroup.Text>
                        <FormControl
                            placeholder="Mines"
                            value={numOfMines}
                            onChange={(e) => onChangeNumOfMines(e.target.value)}
                            aria-label="Mines"
                        />
                    </Col>
                    <Col>
                        <InputGroup.Text>Number Of Flags</InputGroup.Text>
                        <FormControl
                            placeholder="Flags"
                            value={numOfFlags}
                            aria-label="Mines"
                            readOnly
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


