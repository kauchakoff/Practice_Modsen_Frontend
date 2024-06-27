import React, {useRef, useState} from 'react';
import { logout } from '../../utils/auth/auth';
import './Products.css';
import PizzaCard from "./PizzaCard";
import Product from "../../entity/Product.js";
import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import {Grid} from "@mui/material";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import product from "../../entity/Product.js";

const Products = ({ setUser }) => {
  // const navigate = useNavigate();

  const [productsArray,setProductsArray] = useState([
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product()
  ]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [objectIndex,setObjectIndex] = React.useState(0);
  const [showEditWindow,setShowEditWindow] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const handleLogout = () => {
    logout();
    setUser(null);
    // navigate('/login');
  };

  function closeEditWindow(product){
    setValue("name",product.name);
    setValue("category",product.category);
    setValue("ingredients",product.ingredients);
    setValue("price",product.price);
    setValue("description",product.description);
    setValue("weight",product.weight);
    setValue("caloricValue",product.caloricValue);
    setShowEditWindow(false);
  }

  const handleSave = (data,product) => {
    const elements =  data.target.elements;
    product.name = elements.name.value;
    product.category = elements.category.value;
    product.ingredients = elements.ingredients.value;
    product.price = elements.price.value;
    product.weight = elements.weight.value;
    product.description = elements.description.value;
    product.caloricValue = elements.caloricValue.value;
    data.preventDefault();
  };

  return (
    <>
    <div>
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>

          <Grid container spacing={0} columns={{xs: 1, sm: 2, md: 3,lg: 4,xl: 5}} >
            {productsArray.map((item,index) => (
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                  <PizzaCard
                    product={item}/>
                  <ListGroup horizontal style={{justifyContent:"space-around"}}>
                    <Button variant={"primary"}
                            style={{margin: 0}}
                            onClick={()=>{
                              setShowEditWindow(true);
                              setObjectIndex(index);
                            }}>Edit</Button>
                    <Button variant={"danger"}
                            style={{margin: 0}}
                            onClick={()=>{
                              setShowDeleteConfirmation(true);
                              setObjectIndex(index);
                            }}>Delete</Button>
                  </ListGroup>
              </Grid>

            )) }
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
              <Card style={{


                margin:5,
                display: "grid",
                placeItems: "center"}}>
                <Card.Body>
                  <Button variant={"primary"}
                          style={{
                            display: "flex",
                            alignItems:'center',
                            justifyContent:'center',
                            paddingBottom: 15,
                            fontSize: 32,
                            fontWeight: 'bold',
                            width:50,
                            height:50,
                            borderRadius:100}}
                  onClick={()=>{
                    const arrayWithNewProduct  = [...productsArray,new Product()];
                    setProductsArray(arrayWithNewProduct);
                    setObjectIndex(productsArray.length);
                    console.log(productsArray);
                    setShowEditWindow(true);


                  }}>+</Button>
                </Card.Body>
              </Card>
            </Grid>
          </Grid>


      <Modal show={showDeleteConfirmation} centered>

        <Modal.Header>
          <Modal.Title>Are you sure to delete?</Modal.Title>
          <CloseButton onClick={()=>{
            setShowDeleteConfirmation(false)
          }}/>
        </Modal.Header>
        <Modal.Body>
          <p>You are deleting product from products list. Operation also removes product from database and it's impossible to undo it.</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{
            const changedProductsArray = productsArray.filter((element,currentIndex)=>
                objectIndex !== currentIndex);
            console.log(changedProductsArray);
            setProductsArray(changedProductsArray);
            setShowDeleteConfirmation(false);
            //place to perform back-end delete process
          }}>
            Delete
          </Button>
          <Button variant="warning" onClick={()=>{
            setShowDeleteConfirmation(false)
          }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showEditWindow} centered>
        <form onSubmit={(event)=>{
          handleSubmit(handleSave(event,productsArray[objectIndex]));
          event.preventDefault();
          setShowEditWindow(false);
          reset();

        }}>
          <Modal.Header>
            <Modal.Title>Product Editor</Modal.Title>
            <CloseButton onClick={()=>{

              closeEditWindow(productsArray[objectIndex]);
              reset();
            }}/>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter product name"
                            name="name"
                            {...register("name")}
                            defaultValue={productsArray[objectIndex].name}>
              </Form.Control>

              <Form.Label>Related Category</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter related category id"
                            name="category"
                            {...register("category")}
                            defaultValue={productsArray[objectIndex].category}>
              </Form.Control>

              <Form.Label>Ingredients(separate by comma+space)</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter product ingridients"
                            name="ingredients"
                            {...register("ingredients")}
                            defaultValue={productsArray[objectIndex].ingredients}>
              </Form.Control>

              <Form.Label>Price(USD)</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter price"
                            name="price"
                            {...register("price")}
                            defaultValue={productsArray[objectIndex].price}>
              </Form.Control>

              <Form.Label>Weight(grams)</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter weight"
                            name="weight"
                            {...register("weight")}
                            defaultValue={productsArray[objectIndex].weight}>
              </Form.Control>

              <Form.Label>Description</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter description for product"
                            name="description"
                            {...register("description")}
                            defaultValue={productsArray[objectIndex].description}>
              </Form.Control>

              <Form.Label>Caloric value(kcal)</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter caloric value"
                            name="caloricValue"
                            {...register("caloricValue")}
                            defaultValue={productsArray[objectIndex].caloricValue}>
              </Form.Control>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type={"submit"}>
              Save
            </Button>
            <Button variant="secondary" onClick={()=>{
              closeEditWindow(productsArray[objectIndex]);
              reset();
            }}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>


    </>
  );
};

export default Products;
