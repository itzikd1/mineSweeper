import React from 'react'
import {Button, Modal} from 'react-bootstrap';

export function CenteredModal(props) {
/*
// Modal pop up enter title and text with props
 */
    return (
        <Modal{...props} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}