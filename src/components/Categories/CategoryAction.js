import {http} from "../../utils/http";


export const addNewCategory = async (values)=>{
    try {
        const response = await http.post(`/categories`,values);
        console.log("category response:"+response.data);
    } catch (error) {
        console.error("Failed to load product", error);
        // Обработка ошибки
    }
}

export const getCategoryById = async(id)=>{

}

export const updateCategory = async(id, data,)=>{

}

export const getAllCategories = async ({pageNumber, pageSize, sortBy, sortOrder})=>{

}

export const deleteCategory = async(id)=>{

}