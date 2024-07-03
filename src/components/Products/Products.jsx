import {CloseButton, Col, Dropdown, DropdownButton, DropdownItem, ListGroup, Modal, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {Grid, Select} from "@mui/material";
import PizzaCard from "./PizzaCard";
import {useForm} from "react-hook-form";
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";
import {updateHeader} from "../Header/Header";
import {
    createProductDB,
    deleteProductDB,
    getProductsDB,
    getProductByIdDB
} from "../../utils/db/productUtils";
import {getAllCategories} from "../Categories/CategoryAction";
import ErrorMessage from "./ErrorMessage";
import Product from "../../entity/Product";
import Category from "../../entity/Category";


export async function updateCartButton(){



    try {
        let totalPrice = 0;
        let totalCount = 0;
        const cartItems = JSON.parse(getCookie("cart") || "[]");
        for (let i = 0; i < cartItems.length; i++) {
            const currentProduct = await getProductByIdDB(cartItems[i].id);
            console.log(currentProduct);
            //const currentProduct = productsArray[i]
            if (typeof currentProduct !== "undefined") {
                totalCount += cartItems[i].count;
                totalPrice += currentProduct.price * cartItems[i].count;
            }

        }
        updateHeader(totalCount, totalPrice.toFixed(2));
    }catch (error){
        console.log(error);
    }
}



function Products() {


    const [productsArray,setProductsArray] = useState(
        []
    );
    const pageSize = 10;
    const [showCreateWindow,setShowCreateWindow] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [removeIndex, setRemoveIndex] = useState(0);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorData, setErrorData] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [isNextPageExists, setIsNextPageExists] = useState(isPageExists(pageNumber + 1,"id","asc"));

    const [categoriesArray, setCategoriesArray] = useState([]);
    let [selectedCategoryId, setSelectedCategoryId] = useState(-1);

    useEffect(() => {
        const requestData = {
            pageNumber: 1,
            pageSize: pageSize,
            sortBy: "id",
            sortOrder: "desc",
        }
        if (localStorage.getItem('user')){
            getAllCategories(requestData).then((value) => {
                const allCategory = new Category();
                allCategory.id = -1;
                allCategory.name = "All";
                setCategoriesArray([allCategory, ...value]);
            });
        }
    }, []);

    useEffect(() => {
        async function updatePagination() {
            setIsNextPageExists(await isPageExists(pageNumber + 1, "id", "asc", selectedCategoryId));
        }
        updatePagination();
    }, [selectedCategoryId,setPageNumber]);


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        setFocus,
        clearErrors
    } = useForm();

    useEffect(() => {
        async function loadProducts() {
            try {
                let data;

                if(selectedCategoryId === undefined || selectedCategoryId === null || selectedCategoryId  < 1) {
                    data = await getProductsDB(pageNumber, pageSize, "categoryId", "asc");
                } else {
                    data = await getProductsDB(pageNumber, pageSize, "categoryId", "asc", selectedCategoryId);
                }
                data.map((item) => {
                    item.categoryId = item.category.id;
                    delete item.category;
                });
                setProductsArray(data);
                console.log(JSON.stringify(data));
                const array = [];

                for(let i = 0; i < data.length; i++) {
                    const item = {
                        id : data[i].id,
                        price : data[i].price
                    }
                    array.push(item);
                }
                setCookie("products",JSON.stringify(array),7);
                console.log(data);

            } catch (error) {
                setShowDeleteConfirmation(false);
                setErrorMessage(error.message);
                setErrorData(error.data);
                setShowError(true);
            }
        }
        loadProducts();

    }, [selectedCategoryId]);




    const handleSave = (data,product) => {
        console.log(data);
        const elements =  data.target.elements;
        console.log(elements.name.value);
        console.log(product);
        product.name = elements.name.value;
        product.categoryId = elements.category.value;
        product.ingredients = elements.ingredients.value;
        product.price = elements.price.value;
        product.weight = elements.weight.value;
        product.description = elements.description.value;
        product.caloricValue = elements.caloricValue.value;
        data.preventDefault();
    }

    async function deleteProduct(product){

        let cart = JSON.parse(getCookie("cart") || "[]");
        cart = cart.filter((element)=> element.id !== product.id);
        setCookie("cart",JSON.stringify(cart),7);
        setShowDeleteConfirmation(false);
        updateCartButton();
        try {
            await deleteProductDB(product);
        } catch (error){
            setShowDeleteConfirmation(false);
            setErrorMessage(error.message);
            setErrorData(error.data);
            setShowError(true);
        }
        setProductsArray(productsArray.filter((element)=> element.id !== product.id));
    }

    async function createProduct(event) {
        event.preventDefault();
        let  createdProduct = new Product();
        handleSubmit(handleSave(event,createdProduct))
        try {
            createdProduct = await createProductDB(createdProduct);
            createdProduct.categoryId = createdProduct.category.id;
            delete createdProduct.category;
            productsArray.push(createdProduct);
            setCookie("products", JSON.stringify(productsArray), 7);
            setShowCreateWindow(false);
        } catch (error) {
            setShowCreateWindow(false);
            setErrorMessage(error.message);
            setErrorData(error.data);
            setShowError(true);
        }
    }


    async function setNextPage(pageNumber,sortBy,sortOrder,selectedCategoryId){
        let products;
        console.log("Current selected next page:" + selectedCategoryId);
        if(selectedCategoryId === undefined || selectedCategoryId === null || selectedCategoryId < 1) {
            products = await getProductsDB(pageNumber, pageSize, "categoryId", "asc");
        } else {
            products = await getProductsDB(pageNumber, pageSize, "categoryId", "asc", selectedCategoryId);
        }
        setProductsArray(products);
    }

    async function isPageExists(pageNumber,sortBy,sortOrder,selectedCategoryId){
        let products;
        console.log("Current selected is exists:" + selectedCategoryId);
        if(selectedCategoryId === undefined || selectedCategoryId === null || selectedCategoryId < 1) {
            products = await getProductsDB(pageNumber, pageSize, "categoryId", "asc");
        } else {
            products = await getProductsDB(pageNumber, pageSize, "categoryId", "asc", selectedCategoryId);
        }
        return products.length !== 0;
    }


    let handleSelectedCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value)
        setPageNumber(1);
    }


    return (
        <>

                <Row style={{margin: 10,
                borderTopLeftRadius: 0}}>
                    <select className="dropdown btn btn-warning"
                            value={null}
                            style={{
                                margin:5,
                                color: 'white',
                                backgroundColor: '#FFA500'
                            }}
                            onChange={handleSelectedCategoryChange}>
                        {categoriesArray.map((category) => <option
                            className="dropdown-item"
                            style={{backgroundColor: 'white',
                                    color: 'black'}}
                            value={category.id}>Category "{category.name}"</option>)}
                    </select>
                </Row>


            <Grid container spacing={0} columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}}>
                {productsArray.map((item, index) => (
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                        <PizzaCard
                            product={item}/>

                        { localStorage.getItem("role") === "[ADMIN]" &&
                        <ListGroup horizontal style={{justifyContent: "space-around", margin: 5}}>
                            <Card.Text style={{
                                fontWeight: "bold",
                                fontSize: 22,
                                margin: 0
                            }}>Remove product:</Card.Text>

                            <Button variant={"danger"}
                                    style={{margin: 0}}
                                    onClick={() => {
                                        setRemoveIndex(index);
                                        setShowDeleteConfirmation(true);
                                    }}>Delete</Button>
                        </ListGroup>
                        }
                    </Grid>

                ))}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                    { (localStorage.getItem("role") === "[ADMIN]"
                            && !isNextPageExists) &&
                    <Card style={{
                        margin: 5,
                        display: "grid",
                        placeItems: "center"
                    }}>
                        <Card.Body>
                            <Button variant={"primary"}
                                    style={{
                                        display: "flex",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingBottom: 15,
                                        fontSize: 32,
                                        fontWeight: 'bold',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100
                                    }}
                                    onClick={() => {
                                        setShowCreateWindow(true);
                                    }}>+</Button>
                        </Card.Body>
                    </Card>
                    }
                </Grid>
            </Grid>
            <div className="pagination-container">
                <Row>
                    <Col>
                        <Button className='btn-pagination' disabled={pageNumber === 1}
                                onClick={async () => {
                                    try {
                                        setNextPage(Math.max(pageNumber - 1, 1), "id", "asc",selectedCategoryId);
                                        setIsNextPageExists(await isPageExists(pageNumber - 1, "id", "asc",selectedCategoryId));
                                        console.log(`Next page exists: ${isNextPageExists} `);
                                        setPageNumber(Math.max(pageNumber - 1, 1));
                                    } catch (error) {
                                        setShowDeleteConfirmation(false);
                                        setErrorMessage(error.message);
                                        setErrorData(error.data);
                                        setShowError(true);
                                    }
                                    }}>&#60;</Button>
                    </Col>
                    <Col>
                        <p className='page-info'>{pageNumber}</p>
                    </Col>
                    <Col>
                        <Button className='btn-pagination' disabled={!isNextPageExists} onClick={async () => {
                            try {
                                setNextPage(pageNumber + 1,"id","asc",selectedCategoryId);
                                setIsNextPageExists(await isPageExists(pageNumber + 2,"id","asc",selectedCategoryId));
                                setPageNumber(pageNumber + 1);
                            } catch (error) {
                                setShowDeleteConfirmation(false);
                                setErrorMessage(error.message);
                                setErrorData(error.data);
                                setShowError(true);
                            }
                            }}>&#62;</Button>
                    </Col>
                </Row>
            </div>

            <Modal show={showCreateWindow} centered>
                <form onSubmit={(event) => {
                    createProduct(event);
                }}>
                    <Modal.Header>
                        <Modal.Title>Product Editor</Modal.Title>
                        <CloseButton onClick={() => {
                            setShowCreateWindow(false);
                            reset();
                            clearErrors();
                        }}/>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter product name"
                                          name="name"
                                          {...register("name",{required: true, minLength: 2, maxLength: 200})}
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].name : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].categoryId : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].ingredients : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].price : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].weight : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].description : ''}
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
                                          defaultValue={productsArray.length > 0 ? productsArray[productsArray.length - 1].caloricValue : ''}
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
                        <Button variant="secondary" onClick={() => {
                            setShowCreateWindow(false);
                            reset();
                            clearErrors();
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>


            <Modal show={showDeleteConfirmation} centered>
                <Modal.Header>
                    <Modal.Title>Are you sure to delete?</Modal.Title>
                    <CloseButton onClick={() => {
                        setShowDeleteConfirmation(false)
                    }}/>
                </Modal.Header>
                <Modal.Body>
                    <p>You are deleting product from products list. Operation also removes product from database and
                        it's impossible to undo it.</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        deleteProduct(productsArray[removeIndex]);
                    }}>
                        Delete
                    </Button>
                    <Button variant="warning" onClick={() => {
                        setShowDeleteConfirmation(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showError} centered>
                <Modal.Header>
                    <Modal.Title>An error occurred!</Modal.Title>
                    <CloseButton onClick={() => {
                        setShowError(false);
                    }}/>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage}</p>
                    <p>{errorData}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => {
                        setShowError(false);
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );


}

export const getErrorMessage = (errorType,fieldName) => {
    switch(errorType) {
        case 'required':
            return `Field '${fieldName}' is required.`;
        case 'maxLength':
            return `The text in field '${fieldName}' of product is too long.`;
        case 'minLength':
            return `The text in field '${fieldName}' of product is too short.`;
        case 'min':
            return `The number in field '${fieldName}' of product is too small.`;
        case 'max':
            return `The number in field '${fieldName}' of product is too large.`;
        default:
            return ""; // Return an empty string if no matching error type is found
    }
};

export default Products;