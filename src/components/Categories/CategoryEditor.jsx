import {Button, CloseButton, Col, Modal, Row, ListGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import CategoryCard from "./CategoryCard";
import {useForm} from "react-hook-form";
import Category from "../../entity/Category";
import {addNewCategory, deleteCategory, getAllCategories, updateCategory} from "./CategoryAction";
import CategoryErrorMessage from "./CategoryErrorMessage";


function CategoryEditor() {

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [categoriesArray, setCategoriesArray] = useState(
    []
  );

  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [objectIndex, setObjectIndex] = React.useState(0);
  const [removeIndex, setRemoveIndex] = React.useState(0);
  const [showEditWindow, setShowEditWindow] = React.useState(false);
  const [showCreationWindow, setShowCreationWindow] = React.useState(false);


  useEffect(() => {
    const requestData = {
      pageNumber: nextPage,
      pageSize: itemsPerPage,
      sortBy: "id",
      sortOrder: "desc",
    }
    getAllCategories(requestData).then((value) => {
      setCategoriesArray(value);

    });
  }, [nextPage]);

  useEffect(() => {
    setPage(nextPage);
  }, [categoriesArray])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm();

  const handleSave = (data, product) => {
    const elements = data.target.elements;
    product.name = elements.name.value;
    data.preventDefault();
  };

  return (
    <>
      <div className="pagination-container">
        <Row>
          <Col>
            <Button className='btn-pagination' onClick={() => setNextPage(Math.max(page - 1, 1))}>&#60;</Button>
          </Col>
          <Col>
            <p className='page-info'>{page}</p>
          </Col>
          <Col>
            <Button className='btn-pagination' onClick={() => setNextPage(page + 1)}>&#62;</Button>
          </Col>
        </Row>
      </div>
      <Grid container spacing={0} columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}}>
        {categoriesArray.length > 0 && categoriesArray.map((item, index) => (
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
            <CategoryCard
              product={item}/>
            <ListGroup horizontal style={{justifyContent: "space-around"}}>
              <Button variant={"primary"}
                      style={{margin: 0}}
                      onClick={() => {
                        setObjectIndex(index);
                        setValue("name", item.name);
                        setShowEditWindow(true);
                      }}>Edit</Button>
              <Button variant={"danger"}
                      style={{margin: 0}}
                      onClick={() => {
                        setRemoveIndex(index);
                        setShowDeleteConfirmation(true);
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
                        const category = new Category();
                        setValue("name", category.name);
                        setShowCreationWindow(true);
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
            const removedElement = categoriesArray.filter((element, currentIndex) =>
              removeIndex === currentIndex);
            const p = deleteCategory(removedElement[0].id);
            p.then(data => {
              const changedProductsArray = categoriesArray.filter((element, currentIndex) =>
                removeIndex !== currentIndex);
              setObjectIndex(changedProductsArray.length - 1);
              setCategoriesArray(changedProductsArray);
              if (changedProductsArray.length === 0) {
                if (page > 1) {
                  setNextPage(page - 1);
                }
              } else {
                const requestData = {
                  pageNumber: page,
                  pageSize: itemsPerPage,
                  sortBy: "id",
                  sortOrder: "desc",
                }
                getAllCategories(requestData).then((value) => {
                  setCategoriesArray(value);

                });
              }

            })
            setShowDeleteConfirmation(false)
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
          const editedCategory = categoriesArray[objectIndex]
          handleSubmit(handleSave(event, editedCategory));
          const p = updateCategory(editedCategory.id, editedCategory)
          p.then(data => {
            categoriesArray[objectIndex] = editedCategory;
          })

          event.preventDefault();
          setShowEditWindow(false);
          reset();

        }}>
          <Modal.Header>
            <Modal.Title>Product Editor</Modal.Title>
            <CloseButton onClick={() => {

              setShowEditWindow(false);
              reset();
            }}/>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter category name"
                            name="name"
                            {...register("name", {required: true, minLength: 2, maxLength: 50})}
                            defaultValue={typeof categoriesArray[objectIndex] !== 'undefined' ? categoriesArray[objectIndex].name : ''}
                            onChange={(e) => {
                              setValue('name', e.target.value, {shouldValidate: true});
                            }}
                            onFocus={(e) => {
                              setValue('name', e.target.value, {shouldValidate: true});
                            }}>
              </Form.Control>
              {errors.name && (
                <CategoryErrorMessage message={getErrorMessage(errors.name.type, "name")}/>
              )}

            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button disabled={errors.name} variant="primary" type={"submit"}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => {
              setShowEditWindow(false);
              reset();
            }}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showCreationWindow} centered>
        <form onSubmit={(event) => {
          const categoryToAdd = new Category();
          categoryToAdd.id = 1
          handleSubmit(handleSave(event, categoryToAdd));

          const p = addNewCategory(categoryToAdd);
          p.then(data => {
            categoryToAdd.id = data.id
            if (categoriesArray.length === itemsPerPage) {
              setNextPage(page + 1);
            } else {
              const arrayWithNewCategory = [...categoriesArray, categoryToAdd];
              setCategoriesArray(arrayWithNewCategory);
              setObjectIndex(categoriesArray.length);
            }
          });

          event.preventDefault();
          setShowCreationWindow(false);
          reset();

        }}>
          <Modal.Header>
            <Modal.Title>Product Creator</Modal.Title>
            <CloseButton onClick={() => {

              setShowCreationWindow(false);
              reset();
            }}/>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter category name"
                            name="name"
                            {...register("name", {required: true, minLength: 2, maxLength: 50})}
                            defaultValue={typeof categoriesArray[objectIndex] !== 'undefined' ? categoriesArray[objectIndex].name : ''}
                            onChange={(e) => {
                              setValue('name', e.target.value, {shouldValidate: true});
                            }}
                            onFocus={(e) => {
                              setValue('name', e.target.value, {shouldValidate: true});
                            }}>
              </Form.Control>
              {errors.name && (
                <CategoryErrorMessage message={getErrorMessage(errors.name.type, "name")}/>
              )}

            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button disabled={errors.name} variant="primary" type={"submit"}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => {
              setShowCreationWindow(false);
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

const getErrorMessage = (errorType, fieldName) => {
  switch (errorType) {
    case 'required':
      return `Field '${fieldName}' is required.`;
    case 'maxLength':
      return `Too much characters for ${fieldName} field value.`;
    case 'minLength':
      return `Too few characters for ${fieldName} field value.`;
    case 'max':
      return `The value of field ${fieldName} is to large.`;
    case 'min':
      return `The value of field ${fieldName} is to small.`;
    default:
      return `Unknown validation error for field ''${fieldName}''.`;
  }
};

export default CategoryEditor;