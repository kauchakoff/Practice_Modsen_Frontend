import {CloseButton, ListGroup, Modal} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {Grid} from "@mui/material";
import CategoryCard from "./CategoryCard";
import {useForm} from "react-hook-form";
import {getCookie, setCookie} from "../../utils/cookie/cookieUtils";
import Category from "../../entity/Category";
import {addNewCategory, deleteCategory, updateCategory} from "./CategoryAction";


function CategoryEditor() {

  const categoriesFromCookie = JSON.parse(getCookie("categories") || "[]"); // getAllCategories({pageNumber, pageSize, sortBy, sortOrder})
  const [categoriesArray, setCategoriesArray] = useState(
    categoriesFromCookie
  );


  if (categoriesArray.length > 0) {
    if (categoriesArray[0].length === 1) {
      const arrayOfDefaultProducts = [
        new Category(),
        new Category(),
        new Category(),
        new Category(),
        new Category(),
      ];
      setCookie("categories", JSON.stringify(arrayOfDefaultProducts), 7);
      setCategoriesArray(arrayOfDefaultProducts);
    }
  }


  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [objectIndex, setObjectIndex] = React.useState(0);
  const [removeIndex, setRemoveIndex] = React.useState(0);
  const [showEditWindow, setShowEditWindow] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm();


  function closeEditWindow(product) {
    setValue("name", product.name);
    setShowEditWindow(false);
  }

  const handleSave = (data, product) => {
    const elements = data.target.elements;
    product.name = elements.name.value;
    data.preventDefault();
  };

  return (
    <>
      <Grid container spacing={0} columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}}>
        {categoriesArray.map((item, index) => (
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
            <CategoryCard
              product={item}/>
            <ListGroup horizontal style={{justifyContent: "space-around"}}>
              <Button variant={"primary"}
                      style={{margin: 0}}
                      onClick={() => {
                        setShowEditWindow(true);
                        setObjectIndex(index);
                      }}>Edit</Button>
              <Button variant={"danger"}
                      style={{margin: 0}}
                      onClick={() => {
                        setShowDeleteConfirmation(true);
                        setRemoveIndex(index);
                      }}>Delete</Button>
            </ListGroup>
          </Grid>

        ))}
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
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
                        const categoryToAdd = new Category();
                        const arrayWithNewCategory = [...categoriesArray, categoryToAdd];
                        setCategoriesArray(arrayWithNewCategory);
                        setCookie("categories", JSON.stringify(arrayWithNewCategory), 7);
                        setObjectIndex(categoriesArray.length);
                        //setShowEditWindow(true);
                        const p = addNewCategory(categoryToAdd);
                      }}>+</Button>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>


      <Modal show={showDeleteConfirmation} centered>
        <Modal.Header>
          <Modal.Title>Are you sure to delete?</Modal.Title>
          <CloseButton onClick={() => {
            setShowDeleteConfirmation(false)
          }}/>
        </Modal.Header>
        <Modal.Body>
          <p>You are deleting product from products list. Operation also removes product from database and it's
            impossible to undo it.</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            const removedCategoryId = categoriesArray[removeIndex].id;
            const removedElement = categoriesArray.filter((element, currentIndex) =>
              removeIndex === currentIndex);
            const changedProductsArray = categoriesArray.filter((element, currentIndex) =>
              removeIndex !== currentIndex);
            setObjectIndex(changedProductsArray.length - 1);
            setCategoriesArray(changedProductsArray);
            const p = deleteCategory(removedCategoryId);
            //place to perform back-end delete process
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


      <Modal show={showEditWindow} centered>
        <form onSubmit={(event) => {
          handleSubmit(handleSave(event, categoriesArray[objectIndex]));
          const p = updateCategory(categoriesArray[objectIndex].id, categoriesArray[objectIndex])
          event.preventDefault();
          setShowEditWindow(false);
          reset();

        }}>
          <Modal.Header>
            <Modal.Title>Product Editor</Modal.Title>
            <CloseButton onClick={() => {

              closeEditWindow(categoriesArray[objectIndex]);
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
                            defaultValue={typeof categoriesArray[objectIndex] !== 'undefined' ? categoriesArray[objectIndex].name : ""}>
              </Form.Control>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type={"submit"}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => {
              closeEditWindow(categoriesArray[objectIndex]);
              reset();
            }}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CategoryEditor;