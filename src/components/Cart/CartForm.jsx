import React from 'react';
import {useState} from "react";
import "./css/cartForm.css"
import { useForm, SubmitHandler } from "react-hook-form"
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";

import {Button, CloseButton, Modal} from "react-bootstrap";
import {http} from "../../utils/http";


const CartForm = ({totalPrice, onFormSubmit}) => {

    const {register,handleSubmit,formState:{errors}} = useForm()
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal,setShowModal] = React.useState(false);

    const onSubmit = async (data) => {
        // insert logic for creating order
        let currentCart = JSON.parse(getCookie("cart") || "[]");
        const orderItems = [];
        currentCart.map(item => {
            orderItems.push({productId: item.id, count: item.count});
           // orderItems.push({productId: 3, count: 2});
        })
        const orderData = {
            price: totalPrice,
            status: "PENDING",
            city: data.city,
            street: data.street,
            houseNumber: data.houseNumber,
            apartmentNumber: data.apartmentNumber,
            creationDate: new Date(),
            orderItems: orderItems,
        }
        console.log("Данные заказа :"+orderData)
        try {

            const urlPath = "http://localhost:8080/api/orders";
            const response = await http.post(urlPath,orderData);;
            setCookie("cart", "[]");
            setErrorMessage('')
            onFormSubmit();
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message);
            setShowModal(true)
        }
        console.log(data)
        document.getElementById("order-form").reset();
    }

    return (
        <div className="address-form">
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
            <div>
                <h2> Enter address </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="order-form">
                <label>Street</label>
                <input type="text" {...register("street", { required: "Street is required" })} />
                {errors.street && <p>{errors.street.message}</p>}
                <label>City</label>
                <input type="text" {...register("city", { required: "City is required" })} />
                {errors.city && <p>{errors.city.message}</p>}
                <label>Apartment Number</label>
                <input type="text" {...register("apartmentNumber", {
                    required: "Apartment Number is required",
                    pattern: {
                        value: /^\d+$/,
                        message: "Apartment Number should be a number"
                    }
                })} />
                {errors.apartmentNumber && <p>{errors.apartmentNumber.message}</p>}
                <label>House Number</label>
                <input type="text" {...register("houseNumber", {
                    required: "House Number is required",
                    pattern: {
                        value: /^\d+$/,
                        message: "House Number should be a number"
                    }
                })} />
                {errors.houseNumber && <p>{errors.houseNumber.message}</p>}
                <span> Итого: {totalPrice} </span>
                <input type="submit"/>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};


export default CartForm;