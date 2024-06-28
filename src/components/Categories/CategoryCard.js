import Card from "react-bootstrap/Card";
import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useRef} from "react";


function CategoryCard(props) {

  const {product: category} = props;
  const [showDescription, setShowDescription] = React.useState(false);

  const target = useRef(null);

  return (
    <>
      <Card style={{
        margin: 5,
        padding: 5
      }}>
        <Card.Body>
          <ListGroup horizontal={true} style={{
            alignItems: "center",
            padding: 0
          }}>
            <Card.Title style={{fontSize: 30}}>{category.name}</Card.Title>
            <Button ref={target}
                    variant="outline-primary"
                    style={{
                      display: "flex",
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 5,
                      fontSize: 18,
                      fontWeight: 'bold',
                      width: 25,
                      height: 25,
                      borderRadius: 100
                    }}
                    onClick={() => {
                      setShowDescription(true)
                    }}>i</Button>
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showDescription} centered>
        <Modal.Header>
          <Modal.Title>Pizza Full Description</Modal.Title>
          <CloseButton onClick={() => {
            setShowDescription(false)
          }}/>
        </Modal.Header>
        <Modal.Body>
          <ListGroup horizontal>
            <Card style={{border: "none"}}>
              <Card.Body>
                <Card.Title>Category</Card.Title>
                <Card.Text>name: {category.name}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDescription(false)
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryCard;
