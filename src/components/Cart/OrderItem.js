import React, {useEffect, useRef} from "react";
import Logo from "../../assets/pizza_test.png"

import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    CloseButton,
    Col,
    Image,
    Modal,
    Row
} from "react-bootstrap";

//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/OrderItem.css'
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";
import {http} from "../../utils/http";



class CardState {
    id;
    imageUrl;
    title;
    description;
    priceForPiece;
    count;
    priceTotal;
    removeCallBack;

    constructor(id, title, description, priceForPiece, count, imageUrl,removeCallback) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.priceForPiece = priceForPiece;
        this.count = count;
        this.priceTotal = this.count * this.priceForPiece;
        this.removeCallBack = removeCallback;

        this.changeCardState = this.changeCardState.bind(this);
        this.updateItemInCart = this.updateItemInCart.bind(this);
    }

    changeCardState(action) {
        const oldPrice = this.priceTotal;
        if (action === "Increase") {
            this.count = this.count + 1;
            this.updateItemInCart(this.id,1)
        } else {
            this.count = Math.max(0, this.count - 1);
            this.updateItemInCart(this.id,-1)
        }
        this.priceTotal = this.priceForPiece * this.count;
        if(this.count === 0)
        {
            this.removeCallBack(-this.priceForPiece);
        }
        return {...this};
    }

    updateItemInCart(itemId, quantity) {
        const currentCart = JSON.parse(getCookie("cart") || "[]");
        const existingItemIndex = currentCart.findIndex(item => item.id === itemId);
        if (existingItemIndex!== -1) {
            currentCart[existingItemIndex].count += quantity;
            if (currentCart[existingItemIndex].count <= 0) {
                currentCart.splice(existingItemIndex, 1);
            }
        } else {
            // Если элемента нет в корзине, добавляем новый элемент
            currentCart.push({...{id:itemId,count:quantity}, quantity: quantity });
        }
        setCookie("cart", JSON.stringify(currentCart), 7);
    }
    saveState() {
        // save state to repository
    }
}

function OrderItem(props) { // Removed TypeScript type annotation

    const [cardState, setCardState] = React.useState(new CardState(0,"","",0,0,"",()=>{}));
    const prevTotalPriceRef = useRef(0);
    const [errorMessage,setErrorMessage] = React.useState("");
    const [showModal,setShowModal] = React.useState(false)


    useEffect(() => {
        async function fetchData() {
            const currentCart = JSON.parse(getCookie("cart") || "[]");
            const existingItemIndex = currentCart.findIndex(item => item.id === props.id);
            if (existingItemIndex !== -1) {
                const item = currentCart[existingItemIndex];
                try {
                    const response = await http.get(`/products/${props.id}`);
                    //const response = await http.get(`/products/1`);
                    const data = response.data;
                    console.log(data.name+" "+data.description+" "+data.price)
                    const state = new  CardState(props.id, data.name, data.description,data.price, item.count, "imageUrl", (count) => {
                        props.onTotalChange(count);
                        props.onRemoveFromCart();
                    });
                    setCardState(state);
                    setErrorMessage("");
                } catch (error) {
                    if (error.response) {
                        setErrorMessage(error.response.data)
                        setShowModal(true)
                    }
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (prevTotalPriceRef.current!== cardState.priceTotal) {
            console.log(cardState.priceTotal+"And prevState:"+prevTotalPriceRef.current)
            const diff = cardState.priceTotal - prevTotalPriceRef.current;

            console.log(`Разница: ${diff}`);
            props.onTotalChange(diff);
            prevTotalPriceRef.current = cardState.priceTotal;
        }
    }, [cardState.priceTotal]);


    return (

        <Card  className="order-item">
            <CardBody>
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
                <Row>
                    <Col className="order-item-img-container">
                        <Image src={Logo} className="order-item-img" ></Image>
                    </Col>
                    <Col className="order-item-info">
                        <Row>
                            <CardTitle className="order-item-title text">{cardState.title}</CardTitle>
                        </Row>
                        <Row>
                            <CardSubtitle className="order-item-description text">{cardState.description}</CardSubtitle>
                        </Row>
                        <Row className="order-item-count-choice">
                            <Col>
                                <Button onClick={() => setCardState(cardState?.changeCardState("Increase"))}>+</Button>
                            </Col>
                            <Col className="order-item-counter">
                                <CardText>{cardState?.count}</CardText>
                            </Col>
                            <Col>
                                <Button onClick={() => setCardState(cardState?.changeCardState("Decrease"))}>-</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="order-item-price">
                        <CardText>Price for piece: <span className="order-item-price-text">{cardState?.priceForPiece}</span></CardText>
                        <CardText>Total: <span className="order-item-price-text">{cardState?.priceForPiece}</span> x {cardState?.count} = <span className="order-item-price-text">{cardState?.priceTotal}</span></CardText>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default OrderItem;