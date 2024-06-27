import React from 'react';
import {useState} from "react";
import "./css/cartForm.css"
import { useForm, SubmitHandler } from "react-hook-form"


const CartForm = ({totalPrice}) => {

    const {register,handleSubmit} = useForm()
    const onSubmit = (data)=>{
        // insert logic for creating order
        console.log(data)
    }

    return (
        <div className="address-form">
            <div>
                <h2> Enter address </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Street</label>
                <input type="text" {...register("street")} />
                <label>City</label>
                <input type="text" {...register("city")} />
                <label>Apartment Number</label>
                <input type="text" {...register("apartmentNumber")} />
                <label>House Number</label>
                <input type="text" {...register("houseNumber")} />
                <span> Итого: {totalPrice} </span>
                <input type="submit"/>
            </form>
        </div>
    );
};


export default CartForm;