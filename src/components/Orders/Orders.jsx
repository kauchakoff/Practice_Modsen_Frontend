import React, {useEffect, useState} from 'react';
import OrderCard from "./OrderCard";
import "./css/OrderCard.css";
import "./css/Pagination.css";

import {Button, CloseButton, Col, Modal, Row} from 'react-bootstrap';
import {http} from "../../utils/http";


const Orders = (props) => {
    const [userId,setUserId] = useState(props?.userId)
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    {console.log(props)}
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        LoadOrders(userId, nextPage);
    }, [nextPage]);

    useEffect(() => {
        setPage(nextPage);
    }, [orders])

    async function handleDeleteOrder(id){
        // insert here delete request to server
        // replace below statements with loadorders with current page.
        const urlPath = "http://localhost:8080/api/orders";
        const token = window.localStorage.getItem('accessToken');
        const cHeaders = {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
        let response;
        try {
            response  =  await  http.delete(urlPath + `/${id}`)
            const updatedOrders = orders.filter(order => order.id !== id);
            if (updatedOrders.length === 0) {
                if (page === 1) {
                    let loaded = await LoadOrders(userId, page);
                    if (loaded.filter(order => order.id !== id).length === 0) {
                        setOrders([]);
                    }
                } else {
                    setNextPage(page - 1);
                }
            } else {
                if (nextPage !== page) {
                    setNextPage(page);
                } else await LoadOrders(userId, page);
            }
            setErrorMessage("")
        } catch (error)
        {
            response.text().then(text => {
                // Извлечение сообщения об ошибке из текста ответа
                const errorMessage = text.match(/Order with id (\d+) not found/);
                if (errorMessage) {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage("Unexpected error")
                }
            });
            setShowModal(true)
        }
    }

    async function handleCancelOrder(id) {
        const updatedOrders = orders.map(order =>
            order.id === id ? {...order, status: 'CANCELLED' } : order
        );
        const updatedOrder = updatedOrders[updatedOrders.findIndex(order => order.id === id)];

        const urlPath = "http://localhost:8080/api/orders";
        try {
            const response = await http.put(urlPath,{
                id: updatedOrder.id,
                status: updatedOrder.status,
                houseNumber:updatedOrder.houseNumber,
                street:updatedOrder.street,
                price:updatedOrder.price,
                creationDate:updatedOrder.creationDate,
                orderItems:updatedOrder.orderItems,
                city:updatedOrder.city,
            })
            setNextPage(page);
            setOrders(updatedOrders);
            setErrorMessage("")
        }
        catch (error)
        {
            if(error.message === "")
            {
                setErrorMessage("Unexpected error")
            }
            setErrorMessage(error.message)
            setShowModal(true)
        }

    }

    async function LoadOrders(userId, pageToLoad) {
        console.log("UserID:"+userId)
        let urlPath = `/orders?pageNumber=${pageToLoad-1}&&pageSize=3`
        if(userId !== undefined && userId !== null)
        {
            urlPath = `/orders?pageNumber=${pageToLoad-1}&&pageSize=3&&user=${userId}`
        }
        try {
            let response = await http.get(urlPath);
            const loadedOrders = await response.data;
            if (loadedOrders.length != 0) setOrders(loadedOrders);
            return loadedOrders;
        }
        catch (error)
        {
            if (error.response) {

                console.log(error.response.data)
                setErrorMessage(error.response.data)
                console.log(localStorage.getItem("refreshToken"))
                setShowModal(true)
            }
        }
    }

    return (
        <>

            {orders.length > 0 ? (
                <div className="orders-container">
                    <div>

                        {orders.map((order) => (
                            <OrderCard
                                id={order.id}
                                userRole={localStorage.getItem("role")}
                                date = {order.creationDate}
                                status = {order.status}
                                price = {order.price}
                                city = {order.city}
                                street = {order.street}
                                houseNumber = {order.houseNumber}
                                apartmentNumber = {order.apartmentNumber}
                                orderItems = {order.orderItems}
                                handleDelete = {()=>{handleDeleteOrder(order.id)}}
                                handleCancel = {()=>{handleCancelOrder(order.id)}}
                            >
                            </OrderCard>
                        ))}
                        <div className="pagination-container">
                            <Row>
                                <Col>
                                    <Button className='btn-pagination' onClick={() => setNextPage(Math.max(page - 1, 1))}>&#60;</Button>
                                </Col>  
                                <Col>
                                    <p className='page-info'>{page}</p>
                                </Col>                          
                                <Col>
                                    <Button className='btn-pagination' onClick={() => setNextPage(page + 1)}>&#62;</Button>
                                </Col>                        
                            </Row>                     
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cart-empty-container">
                    <div className="cart-empty-span-container">
                        <span>Orders history is empty</span>
                    </div>
                </div>
            )
            }
            {console.log("Вывожу ошибку:"+errorMessage)}
            <Modal show={showModal} centered>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                    <CloseButton onClick={()=>{
                        setShowModal(false)
                    }}/>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=>{
                        setShowModal(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Orders;