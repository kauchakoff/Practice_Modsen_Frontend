import Card from "react-bootstrap/Card";
import {ButtonGroup, CloseButton, ListGroup, Modal, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useRef} from "react";
import Image from 'react-bootstrap/Image';
import PizzaEditor from "./PizzaEditor";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form'
import {getCookie, setCookie} from "../../utils/cookieUtils";
import {updateHeader} from "../Header/Header";

function PizzaCard(props) {

    const {product} = props
    const [showDescription,setShowDescription] = React.useState(false);
    const [isInCart, setIsInCart] = React.useState(false);
    let [count, setCount] = React.useState(1);



    const target = useRef(null);

    function addInCart() {
        const currentCart = JSON.parse(getCookie("cart") || "[]")
        currentCart.push({id:product.id,count:count});
        setCookie("cart", JSON.stringify(currentCart), 7);
        setIsInCart(true)
    }
    function removeFromCart() {
        let currentCart = JSON.parse(getCookie("cart") || "[]");
        currentCart = currentCart.filter(item => item.id!== product.id);
        setCookie("cart", JSON.stringify(currentCart), 7);
        setIsInCart(false)
    }
    function increaseCount() {
        const currentCart = JSON.parse(getCookie("cart") || "[]");
        const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
        currentCart[existingItemIndex].count += 1;
        setCookie("cart", JSON.stringify(currentCart), 7);
        setCount(count + 1)
    }
    function decreaseCount() {
        if(count > 1) {
            const currentCart = JSON.parse(getCookie("cart") || "[]");
            const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
            currentCart[existingItemIndex].count -= 1;
            setCookie("cart", JSON.stringify(currentCart), 7);
            setCount(count - 1)
        }
    }





    return (
        <>
         <Card style={{margin: 5,padding: 5}}>
             <Card.Img variant="top"
                       src={"../../../public/assets/images/pizza_test.png"}
                       style={{backgroundSize: "contain",margin: 5,width: 300,height: 300}}></Card.Img>
             <Card.Body>
                 <ListGroup horizontal={true} style={{alignItems:"center",padding:0}}>
                     <Card.Title style={{fontSize: 30}}>{product.name}</Card.Title>
                     <Button ref={target}
                             variant="outline-primary"
                             style={{fontSize: 14,fontWeight: 500,margin: 5,width:"7%",height:"7%",borderRadius: "50%", padding:0}}
                             onClick={()=>{setShowDescription(true)}}>i</Button>
                 </ListGroup>
                 <Card.Text>{product.description}</Card.Text>
             </Card.Body>
             { !isInCart ? (
                 <ListGroup horizontal={true}
                            style={{justifyContent: "space-between", alignItems: "center", border: "none"}}>
                         <Card.Text style={{fontSize: 18, margin: 5}}>{product.price.toString()}$</Card.Text>
                         <Button variant="primary"
                                 style={{fontSize: 18, marginTop: 5}}
                                 onClick={addInCart}>В корзину</Button>
                 </ListGroup>
             ) : (
                 <ListGroup horizontal={true}
                            style={{justifyContent: "space-between", alignItems: "center", border: "none",paddingTop: 5,paddingBottom: 5}}>
                     <Button variant="primary"
                             style={{fontSize: 18,width:"10%",height:"10%",borderRadius: "50%", padding:0}}
                             onClick={increaseCount}>+</Button>
                     <Card.Text style={{fontSize: 18, margin: 0}}>{count}</Card.Text>
                     <Button variant="primary"
                             style={{fontSize: 18,width:"10%",height:"10%",borderRadius: "50%", padding:0}}
                             onClick={decreaseCount}>-</Button>
                     <Button variant="danger"
                             style={{fontSize: 18, marginTop: 5}}
                             onClick={removeFromCart}>Убрать из корзины</Button>
                 </ListGroup>)
             }
         </Card>


            <Modal show={showDescription}  centered>
            <Modal.Header>
                <Modal.Title>Pizza Full Description</Modal.Title>
                <CloseButton onClick={()=>{setShowDescription(false)}}/>
            </Modal.Header>
            <Modal.Body >
                <ListGroup horizontal>
                <Image
                    src={"../../../public/assets/images/pizza_test.png"}
                    style={{backgroundSize: "contain",margin: 5,width:"40%",height:"40%"}}></Image>
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
