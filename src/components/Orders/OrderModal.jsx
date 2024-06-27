import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import OrderItemInfo from "./OrderItemInfo";


function OrderModal(props) {
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Детали заказа
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="span-container">
                    <span>Дата заказа: {props.date}</span>
                    <span>Cтатус заказа: {props.status}</span>
                    <span className="price-text">Стоимость заказа: {props.price}</span>
                    <div className="delimiter"></div>
                    <span>Адрес доставки:</span>
                    <span>Город: {props.city}</span>
                    <span>Улица: {props.street}</span>
                    <span>Номер дома: {props.houseNumber}</span>
                    <span>Номер квартиры: {props.apartmentNumber}</span>
                    <div className="delimiter"></div>
                    <span>Элементы заказа:</span>
                    <div>
                        <ul className="modal-scrollable-list">
                            <li>
                                <div className="order-modal-items-container">
                                    {console.log(props.orderItems)}
                                    {props.orderItems.map(item => (
                                        <OrderItemInfo title={item.product.title}
                                                       description={item.product.description}
                                                       priceForPiece={item.product.price}
                                                       imageUrl={item.product.imageUrl}
                                                       id={item.product.id}
                                                       count={item.count}
                                        />
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{props.onHide()}}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>

)
    ;
}

export default OrderModal;