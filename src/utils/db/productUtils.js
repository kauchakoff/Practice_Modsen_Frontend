import {http} from "../http";
import ModalWindow from "../../components/errors/errorWindow";
import {CloseButton, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";


export async function createProductDB(product){
    product.id = null;
   const createdProduct = await http.post("/products", product).catch((error)=>{
       console.log(error);
       return (
           <ModalWindow isOpen={true} errorMessage={error} onClose={()=>{}}/>
       );
   });
   return createdProduct.data;
}

export async function deleteProductDB(product){
    try {
        await http.delete("/products/" + product.id);
    }catch (error){
        throw error;
    }
}

export async function updateProductDB(product){
    try {
        const updatedProduct = await http.put("/products", product);
        return updatedProduct.data;
    }catch (error){
        throw error;
    }
}

export async function getProductsDB(pageNumber, pageSize, sortBy, sortOrder,categoryId){
    try {
        let productList

        if(categoryId) {
            productList = await http.get(`/products?pageNumber=${pageNumber - 1}&&pageSize=${pageSize}&&sortBy=${sortBy}&&sortOrder=${sortOrder}&&category=${categoryId}`);
        } else {
            productList = await http.get(`/products?pageNumber=${pageNumber - 1}&&pageSize=${pageSize}&&sortBy=${sortBy}&&sortOrder=${sortOrder}`);
        }
        return productList.data;
    }catch (error){
        throw error;
    }
}

export async function getProductByIdDB(productId){
    try {
        let product = await http.get(`/products/` + productId);
        return product.data;
    }catch (error){
        throw error;
    }

}