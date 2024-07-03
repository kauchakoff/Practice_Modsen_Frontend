import React, {useEffect, useState} from 'react';
import "./css/cart.css"
import OrderItem from "./OrderItem";
import CartForm from "./CartForm";
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";
import {updateHeader} from "../Header/Header";


const Cart = (props) => {
    const [cartItems, setCartItems] = React.useState(JSON.parse(getCookie("cart") || '[]'));
    const [totalCost, setTotalCost] = useState(0);

    function onTotalChange(count)
    {
        setTotalCost(prevTotalCost => prevTotalCost + count);
        console.log("переданное число:"+count)
        setCartItems(JSON.parse(getCookie("cart") || '[]'))
    }
    function onRemoveFromCart(itemId) {
        let currentCart = JSON.parse(getCookie("cart") || "[]");
        currentCart = currentCart.filter(item => item.id!== itemId);
        setCookie("cart", JSON.stringify(currentCart), 7);
        const updatedCartItems = cartItems.filter(cartItem => cartItem.id!== itemId);
        setCartItems(updatedCartItems);
    }// Зависимость от cartItems

    useEffect(()=>{
        const totalQuantity = Math.max(0,cartItems.reduce((acc, item) => acc + item.count, 0));
        console.log(totalCost)
        updateHeader(totalQuantity, totalCost.toFixed(2))
    },[totalCost, cartItems])

    return (
       <>
           {cartItems.length>0 ?(
               <div className="cart">
                   <div>
                       <ul style={{ margin: '20px' }} className="scrollable-list">
                           <li>
                               {cartItems.map((item,index) => (
                                   <OrderItem id={item.id} onRemoveFromCart={()=>{onRemoveFromCart(item.id)}} onTotalChange={(count)=>onTotalChange(count)}></OrderItem>
                               ))}
                           </li>
                       </ul>
                   </div>
                   <div className="form-container">
                       <CartForm totalPrice={totalCost.toFixed(2)} onFormSubmit={() => {setCartItems([]); setTotalCost(0);}}></CartForm>
                   </div>
               </div>
           ):(
                <div className="cart-empty-container">
                    <div className="cart-empty-span-container">
                        <span>Cart is empty</span>
                    </div>
                </div>
               )}


       </>
    );
};

export default Cart;