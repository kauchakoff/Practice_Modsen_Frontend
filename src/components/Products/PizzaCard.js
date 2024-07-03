import Card from "react-bootstrap/Card";
import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import Image from 'react-bootstrap/Image';
import logo from "../../resources/pizza_test.png";
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";
import {getErrorMessage, updateCartButton} from "./Products";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {updateProductDB} from "../../utils/db/productUtils";
import ErrorMessage from "./ErrorMessage";


function PizzaCard(props) {

    const {product} = props;
    const [showDescription,setShowDescription] = React.useState(false);
    const [showEditWindow,setShowEditWindow] = React.useState(false);
    const [isInCart, setIsInCart] = React.useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorData, setErrorData] = useState("");

    let [count, setCount] = React.useState(1);

    useEffect(() => {
        isExistInCart();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        setFocus,
    } = useForm();


    async function updateProduct(event){
        handleSubmit(submitHandler(event,product));
        event.preventDefault();
        setShowEditWindow(false);
        reset();
        try {
            await updateProductDB(product);
        }catch (error){
            setShowEditWindow(false);
            setErrorMessage(error.message);
            setErrorData(error.response.data);
            setShowError(true);
        }
    }

    const submitHandler = (data,product) => {
        const elements =  data.target.elements;
        product.name = elements.name.value;
        product.categoryId = elements.category.value;
        product.ingredients = elements.ingredients.value;
        product.price = elements.price.value;
        product.weight = elements.weight.value;
        product.description = elements.description.value;
        product.caloricValue = elements.caloricValue.value;
        data.preventDefault();
    }


    function addInCart() {
        const currentCart = JSON.parse(getCookie("cart") || "[]")
        currentCart.push({id:product.id,count:count});
        setCookie("cart", JSON.stringify(currentCart), 7);
        setIsInCart(true);
        updateCartButton();
    }

    function removeFromCart() {
        let currentCart = JSON.parse(getCookie("cart") || "[]");
        currentCart = currentCart.filter(item => item.id !== product.id);
        setCookie("cart", JSON.stringify(currentCart), 7);
        setIsInCart(false);
        setCount(1);
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
            const isProductInCart = typeof currentProduct !== 'undefined';
            if(isProductInCart) {
                setIsInCart(true);
                setCount(currentCart[existingProductId].count);
            } else {
                setIsInCart(false);
            }

        } else {
            setIsInCart(false);
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
                     <Button
                             variant="outline-warning"
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
                 !(isInCart)
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
                                        margin: 0}}>{count}</Card.Text>
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
         { localStorage.getItem("role") === "[ADMIN]" &&
            <ListGroup horizontal style={{justifyContent:"space-around"}}>
                <Card.Text style={{
                    fontWeight: "bold",
                    fontSize: 22,
                    margin: 0
                }}>Edit product:</Card.Text>
                <Button variant={"primary"}
                        style={{margin: 0}}
                        onClick={()=>{
                            setShowEditWindow(true);
                        }}>Edit</Button>
            </ListGroup>
         }

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
                    <Button variant="primary" onClick={() => {
                        setShowDescription(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>





            <Modal show={showEditWindow} centered>
                <form onSubmit={(event)=>{
                    updateProduct(event);
                }}>
                    <Modal.Header>
                        <Modal.Title>Product Editor</Modal.Title>
                        <CloseButton onClick={()=>{
                            setShowEditWindow(false);
                            reset();
                        }}/>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter product name"
                                          name="name"
                                          {...register("name",{required: true, minLength: 2, maxLength: 200})}
                                          defaultValue={product.name}
                                          onChange={(event)=>{
                                              setValue("name",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("name",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.name &&
                                <ErrorMessage message={getErrorMessage(errors.name.type,"name")} />
                            }

                            <Form.Label>Related Category</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter related category id"
                                          name="category"
                                          {...register("category",{required: true, min: 1})}
                                          defaultValue={product.categoryId}
                                          onChange={(event)=>{
                                              setValue("category",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("category",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.category &&
                                <ErrorMessage message={getErrorMessage(errors.category.type,"category")} />
                            }

                            <Form.Label>Ingredients(separate by comma+space)</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter product ingridients"
                                          name="ingredients"
                                          {...register("ingredients")}
                                          defaultValue={product.ingredients}
                                          onChange={(event)=>{
                                              setValue("ingredients",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("ingredients",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.ingredients &&
                                <ErrorMessage message={getErrorMessage(errors.ingredients.type,"ingredients")} />
                            }

                            <Form.Label>Price(USD)</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter price"
                                          name="price"
                                          {...register("price",{required: true, minLength: 0})}
                                          defaultValue={product.price}
                                          onChange={(event)=>{
                                              setValue("price",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("price",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.price &&
                                <ErrorMessage message={getErrorMessage(errors.price.type,"price")} />
                            }

                            <Form.Label>Weight(grams)</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter weight"
                                          name="weight"
                                          {...register("weight",{required: true, min: 0})}
                                          defaultValue={product.weight}
                                          onChange={(event)=>{
                                              setValue("weight",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("weight",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.weight &&
                                <ErrorMessage message={getErrorMessage(errors.weight.type,"weight")} />
                            }

                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter description for product"
                                          name="description"
                                          {...register("description",{required: true, min: 0})}
                                          defaultValue={product.description}
                                          onChange={(event)=>{
                                              setValue("description",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("description",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.description &&
                                <ErrorMessage message={getErrorMessage(errors.description.type,"description")} />
                            }

                            <Form.Label>Caloric value(kcal)</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter caloric value"
                                          name="caloricValue"
                                          {...register("caloricValue")}
                                          defaultValue={product.caloricValue}
                                          onChange={(event)=>{
                                              setValue("caloricValue",event.target.value,{shouldValidate: true});
                                          }}
                                          onFocus={(event)=>{
                                              setFocus("caloricValue",{shouldValidate: true});
                                          }}>
                            </Form.Control>
                            {errors.caloricValue &&
                                <ErrorMessage message={getErrorMessage(errors.caloricValue.type,"caloricValue")} />
                            }
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" disabled={Object.keys(errors).filter(key => errors[key]).length !== 0} type={"submit"}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={()=>{
                            setShowEditWindow(false);
                            reset();
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <Modal show={showError} centered>
                <Modal.Header>
                    <Modal.Title>An error occurred!</Modal.Title>
                    <CloseButton onClick={()=>{
                        setShowError(false);
                    }}/>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage}</p>
                    <p>{errorData}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=>{
                        setShowError(false);
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default PizzaCard;
