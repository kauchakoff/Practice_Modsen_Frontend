import React, {useEffect, useState} from 'react';
import OrderCard from "./OrderCard";
import "./css/OrderCard.css"

import { Link as NavLink } from "react-router-dom";
import {Pagination, PaginationItem} from "@mui/material";


const Orders = (props) => {
    const [userId,setUserId] = useState(props?.userId)
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pageQty, setPageQty] = useState(0);
    {console.log(props)}

    useEffect(() => {
        LoadOrders(userId,page)
    }, [ page, props.history]);

    function handleDeleteOrder(id){
        // insert here delete request to server
        // replace below statements with loadorders with current page.
        const updatedOrders = orders.filter(order => order.id!== id);
        setOrders(updatedOrders);
    }

    function handleCancelOrder(id) {
        const updatedOrders = orders.map(order =>
            order.id === id? {...order, status: 'CANCELED' } : order
        );

        setOrders(updatedOrders);
        //insert here request to server
    }

    function LoadOrders(userId, page) {
        // Предполагается, что здесь происходит асинхронная загрузка данных
        // Например, fetch запрос к API
        // Здесь мы просто симулируем загрузку данных
        const orderItems = [
            {
                product:{
                    id:1,
                    title:"some product title 1",
                    description:"some very very very very very very very huuuuuuuuuuuuuuuuuuuuuuuge description1",
                    price:10,
                    imageUrl:"/some/url.png"
                },
                count:2,
            },
            {
                product:{
                    id:2,
                    title:"some product title 2",
                    description:"some very very very very very very very huuuuuuuuuuuuuuuuuuuuuuuge description2",
                    price:15,
                    imageUrl:"/some/url.png"
                },
                count:1,
            },
            {
                product:{
                    id:3,
                    title:"some product title 3",
                    description:"some very very very very very very very huuuuuuuuuuuuuuuuuuuuuuuge description3",
                    price:20,
                    imageUrl:"/some/url.png"
                },
                count:5,
            },
            {
                product:{
                    id:15,
                    title:"some product title 15",
                    description:"some very very very very very very very huuuuuuuuuuuuuuuuuuuuuuuge description15",
                    price:20,
                    imageUrl:"/some/url.png"
                },
                count:1,
            },

        ]

        const loadedOrders = [
            {
                id: 1,
                date:"22.02.1231",
                status:"COMPLETED",
                city:"CityName1",
                street:"StreetName1",
                apartmentNumber:12,
                houseNumber:23,
                price:100,
                orderItems:orderItems,
            },
            {
                id: 2,
                date:"22.02.2022",
                status:"PENDING",
                city:"CityName2",
                street:"StreetName2",
                apartmentNumber:1234,
                houseNumber:223,
                price:200,
                orderItems:orderItems,
            },
            {
                id: 2,
                date:"22.02.2012",
                status:"COMPLETED",
                city:"CityName3",
                street:"StreetName3",
                apartmentNumber:333,
                houseNumber:33,
                price:300,
                orderItems:orderItems,
            },
        ];
        setPageQty(3);
        setOrders([loadedOrders[page - 1]]);
       // setOrders([loadedOrders[0],loadedOrders[1],loadedOrders[2]]);
    }

    return (

        <div className="orders-container">
            <div>

                {orders.map((order) => (
                    <OrderCard
                        id={order.id}
                        userRole="ADMIN"
                        date = {order.date}
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
                {!!pageQty && (
                    <Pagination
                        count={pageQty}
                        page={page}
                        onChange={(_, num) => setPage(num)}
                        showFirstButton
                        showLastButton
                        sx={{ marginY: 3, marginX: "auto" }}
                        renderItem={(item) => (
                            <PaginationItem
                                component={NavLink}
                                to={`/orders?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                )}
                </div>
            </div>
        </div>
    );
};

export default Orders;