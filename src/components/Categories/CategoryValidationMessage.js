import {CardText, ListGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./CategoryValidationMessage.css"

function CategoryValidationMessage(props) {

  const {message} = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <p>
      <ListGroup horizontal
                 className={`component ${isVisible ? 'component-visible' : 'component-hidden'}`}
                 style={{padding: 5, alignItems: "center"}}>
        <CardText style={{
          color: "red",
          fontWeight: "bold",
          marginLeft: 5
        }}>{message}</CardText>
      </ListGroup>
    </p>
  )
}

export default CategoryValidationMessage;