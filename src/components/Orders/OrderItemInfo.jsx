import React, {useEffect, useRef} from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Image, Row } from "react-bootstrap";

//import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/pizza_test.png"
import './css/OrderModel.css'


function OrderItemInfo(props) {
    return (
        <Card  className="order-modal-item">
            <CardBody>
                <Row>
                    <Col className="order-modal-item-img-container">
                        <Image src={Logo} className="order-modal-item-img" ></Image>
                    </Col>
                    <Col className="order-modal-item-info">
                        <Row>
                            <CardTitle className="order-modal-item-title text">{props.title}</CardTitle>
                        </Row>
                        <Row>
                            <CardSubtitle className="order-modal-item-description text">{props.description}</CardSubtitle>
                        </Row>
                        <Row className="order-modal-item-count-choice">
                                <CardText>Количество: {props?.count}</CardText>
                        </Row>
                    </Col>
                    <Col className="order-modal-item-price">
                        <div className="test">
                            <CardText style={{fontWeight:600}}>Price for piece: </CardText>
                            <span className="order-modal-item-price-text">{props?.priceForPiece}</span>
                        </div>
                        <CardText style={{fontWeight:600}}>Total: <span className="order-modal-item-price-text">{props?.priceForPiece}</span> x {props?.count} = <span className="order-modal-item-price-text" style={{textAlign:"center"}}>{props?.priceForPiece*props?.count}</span></CardText>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default OrderItemInfo;