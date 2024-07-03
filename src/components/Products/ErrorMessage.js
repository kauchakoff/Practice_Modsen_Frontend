import logo from "../../assets/error_icon.svg"
import {CardText, Image, ListGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./ErrorMessage.css"

function ErrorMessage(props){

    const {message} = props;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
        setIsVisible(true);
    },[]);

    return (
        <p>
                <ListGroup horizontal
                           className={`component ${isVisible? 'component-visible' : 'component-hidden'}`}
                           style={{padding: 5,alignItems:"center"}}>
                    <Image src={logo} width={20} height={20}></Image>
                    <CardText style={{
                        color:"red",
                        fontWeight: "bold",
                        marginLeft: 5
                    }}>{message}</CardText>
                </ListGroup>
        </p>
    )
}

export default ErrorMessage;