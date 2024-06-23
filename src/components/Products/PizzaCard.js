import Card from "react-bootstrap/Card";
import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useRef} from "react";
import Image from 'react-bootstrap/Image';
import logo from "../../resources/pizza_test.png";
import {getCookie, setCookie} from "../../utils/cookieUtils";
import {execute} from "bootstrap/js/src/util";
import {updateCartButton} from "./Products";


function PizzaCard(props) {

    const {product} = props;
    const [showDescription,setShowDescription] = React.useState(false);

    //this state variable used for re-rendering purpose only
    const [isInCart, setIsInCart] = React.useState(false);

    let [count, setCount] = React.useState(1);

    let isProductInCart = false;

    let countFromCart = 0;

    isExistInCart();


    const target = useRef(null);

    function addInCart() {
        const currentCart = JSON.parse(getCookie("cart") || "[]")
        currentCart.push({id:product.id,count:count});
        setCookie("cart", JSON.stringify(currentCart), 7);
        if(!isInCart){
            setIsInCart(true);
        } else {
            setIsInCart(false);
        }
        isProductInCart = true;
        updateCartButton();
    }
    function removeFromCart() {
        let currentCart = JSON.parse(getCookie("cart") || "[]");
        currentCart = currentCart.filter(item => item.id !== product.id);
        setCookie("cart", JSON.stringify(currentCart), 7);
        if(!isInCart){
            setIsInCart(true);
        } else {
            setIsInCart(false);
        }

        isProductInCart = false;
        updateCartButton();
    }
    function increaseCount() {
        const currentCart = JSON.parse(getCookie("cart") || "[]");
        const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
        currentCart[existingItemIndex].count += 1;
        setCookie("cart", JSON.stringify(currentCart), 7);
        setCount(currentCart[existingItemIndex].count);
        updateCartButton();

    }
    function decreaseCount() {
        if(count > 1) {
            const currentCart = JSON.parse(getCookie("cart") || "[]");
            const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
            currentCart[existingItemIndex].count -= 1;
            setCookie("cart", JSON.stringify(currentCart), 7);
            setCount(currentCart[existingItemIndex].count)

        }
        updateCartButton();
    }

    function isExistInCart() {
        const currentCart = JSON.parse(getCookie("cart") || "[]");
        const existingProductId = currentCart.findIndex(item => item.id === product.id);
        if(existingProductId !== -1) {
            const currentProduct = currentCart[existingProductId].id === product.id ? product : undefined;
            isProductInCart = typeof currentProduct !== 'undefined';
            if(isProductInCart) {
                countFromCart = currentCart[existingProductId].count;
            }

        } else {
            isProductInCart = false;
        }

    }




    return (
        <>
         <Card style={{margin: 5,
                       padding: 5}}>
             <Card.Img variant="top"
                       src={logo}
                       style={{backgroundSize: "contain",
                               margin: 5,
                               width: 300,
                               height: 300}}></Card.Img>
             <Card.Body>
                 <ListGroup horizontal={true} style={{alignItems:"center",
                                                      padding:0}}>
                     <Card.Title style={{fontSize: 30}}>{product.name}</Card.Title>
                     <Button ref={target}
                             variant="outline-primary"
                             style={{
                                 display: "flex",
                                 alignItems:'center',
                                 justifyContent:'center',
                                 marginLeft: 5,
                                 fontSize: 18,
                                 fontWeight: 'bold',
                                 width:25,
                                 height:25,
                                 borderRadius:100}}
                             onClick={()=>{setShowDescription(true)}}>i</Button>
                 </ListGroup>
                 <Card.Text>{product.description}</Card.Text>
             </Card.Body>

             {
                 // isInCart is only for re-rendering,logic is based on isProductInCart value
                 !((!isInCart && isInCart) || isProductInCart)

                 ? (
                 <ListGroup horizontal={true}
                            style={{justifyContent: "space-between",
                                    alignItems: "center",
                                    border: "none"}}>
                         <Card.Text style={{fontSize: 18,
                                            margin: 5}}>{product.price.toString()}$</Card.Text>
                         <Button variant="primary"
                                 style={{fontSize: 18,
                                         marginTop: 5}}
                                 onClick={addInCart}>В корзину</Button>
                 </ListGroup>
             ) : (
                 <ListGroup horizontal={true}
                            style={{justifyContent: "space-between",
                                    alignItems: "center",
                                    border: "none",
                                    paddingTop: 5,
                                    paddingBottom: 5}}>
                     <Button variant="primary"
                             style={{display: "flex",
                                     alignItems:'center',
                                     justifyContent:'center',
                                     fontSize: 18,
                                     fontWeight: 'bold',
                                     paddingBottom: 10,
                                     width:30,
                                     height:30,
                                     borderRadius:100}}
                             onClick={increaseCount}>+</Button>
                     <Card.Text style={{fontSize: 18,
                                        margin: 0}}>{count >= countFromCart ? count : countFromCart}</Card.Text>
                     <Button variant="primary"
                             style={{display: "flex",
                                 alignItems:'center',
                                 justifyContent:'center',
                                 fontSize: 18,
                                 paddingBottom: 10,
                                 fontWeight: 'bold',
                                 width:30,
                                 height:30,
                                 borderRadius:100}}
                             onClick={decreaseCount}>-</Button>
                     <Button variant="danger"
                             style={{fontSize: 18,
                                     marginTop: 5}}
                             onClick={removeFromCart}>Убрать из корзины</Button>
                 </ListGroup>)
             }
         </Card>

            <Modal show={showDescription} centered>
                <Modal.Header>
                    <Modal.Title>Pizza Full Description</Modal.Title>
                    <CloseButton onClick={()=>{setShowDescription(false)}}/>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup horizontal>
                    <Image
                        src={logo}
                        style={{backgroundSize: "contain",
                                margin: 5,
                                width:"40%",
                                height:"40%"}}></Image>
                    <Card style={{border:"none"}}>
                        <Card.Body>
                            <Card.Title>Pizza</Card.Title>
                            <Card.Text>30cm, {product.weight}g</Card.Text>
                            <Card.Text><strong>Ingredients: </strong>{product.ingredients} </Card.Text>
                            <Card.Text><strong>Caloric value: </strong>{product.caloricValue} kcal</Card.Text>
                        </Card.Body>
                    </Card>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowDescription(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PizzaCard;
