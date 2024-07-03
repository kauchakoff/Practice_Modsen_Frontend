import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Image, Row} from "react-bootstrap";
import {checkAuthStatus} from "../../utils/auth/auth";

import OrderModal from "./OrderModal";



function OrderCard(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div onClick={(e) => {
            if (!modalShow || e.target.closest('.order-modal')!== null) {
                return;
            }
            setModalShow(false);
        }}>
        <Card className="order-card-container">
            <CardBody >
                <div className="order-card">
                    <div className="order-card-id-container">
                        <h6>Номер заказа: {props.id}</h6>
                    </div>
                    <div className="delimiter"></div>
                    <div className="order-card-info-container">
                           <span>
                                Дата: {props.date}
                           </span>
                        <span>
                                Статус заказа: {props.status}
                        </span>
                    </div>
                    <div className="delimiter"></div>
                    <div className="order-card-address-container">
                            <span>
                                 Адрес: {`г.${props.city},`}  {`ул.${props.street},`}  {`д.${props.houseNumber},`} {`кв.${props.apartmentNumber}`}
                            </span>
                    </div>
                    <div className="delimiter"></div>
                    <div className="order-card-price-container">
                        <span>Стоимость:</span>
                        <span className="price-text">{props.price} </span>
                    </div>
                    <div className="delimiter"></div>
                    <div className="order-card-buttons-container">
                        {}
                        {!(props.status === "COMPLETED") && !(props.status === "CANCELLED") &&(
                        <>
                            <button onClick={props.handleCancel}>Отменить</button>
                        </>)
                        }
                        {}
                        {(props.userRole === "ADMIN") &&(
                            <>
                                <button onClick={props.handleDelete}>Удалить</button>
                            </>

                            )}
                        <button onClick={() => {setModalShow(true)}} > Детали</button>
                    </div>
                </div>
            </CardBody>
            <OrderModal   show={modalShow}
                          onHide={() => {setModalShow(false)}}
                          id = {props.id}
                          date = {props.date}
                          status = {props.status}
                          price = {props.price}
                          city = {props.city}
                          street = {props.street}
                          houseNumber = {props.houseNumber}
                          apartmentNumber = {props.apartmentNumber}
                          orderItems = {props.orderItems}
            >

            </OrderModal>
        </Card>
        </div>
    );
}

export default OrderCard;

