import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";


function PizzaEditor(props){

    let {show} = props


    return (

        <>
    <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title>Product Editor</Modal.Title>
            <CloseButton />
        </Modal.Header>
        <Modal.Body>
            <form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name"></Form.Control>

                    <Form.Label>Related Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter related category id"></Form.Control>

                    <Form.Label>Ingredients(separate by comma+space)</Form.Label>
                    <Form.Control type="text" placeholder="Enter product ingridients"></Form.Control>

                    <Form.Label>Price(USD)</Form.Label>
                    <Form.Control type="text" placeholder="Enter price"></Form.Control>

                    <Form.Label>Weight(grams)</Form.Label>
                    <Form.Control type="text" placeholder="Enter weight"></Form.Control>

                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description for product"></Form.Control>

                    <Form.Label>Caloric value(kcal)</Form.Label>
                    <Form.Control type="text" placeholder="Enter caloric value"></Form.Control>
                </Form.Group>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => {
            }}>
                Save
            </Button>
            <Button variant="secondary" onClick={() => {
            }}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
            </>
    );
}

export default PizzaEditor;