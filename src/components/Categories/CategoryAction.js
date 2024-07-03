import {http} from "../../utils/http";

export const addNewCategory = async (values) => {
  const categoryData = {
    id: null,
    name: values.name,
  }

  try {
    const p = await http.post('/categories', categoryData);
    return p.data
  } catch (error) {
    console.error("Failed add new category:", error);
    return null;
  }
}

export const getCategoryById = async (id) => {
  try {
    const p = await http.get(`/categories/${id}`);
    return p.data
  } catch (error) {
    console.error("Failed get category by id:", error);
    return null;
  }
}

export const updateCategory = async (id, data,) => {
  const categoryData = {
    id: data.id,
    name: data.name,
  }

  try {
    const p = await http.put(`/categories`, categoryData);
    return p.data
  } catch (error) {
    console.error("Failed update category by id:", error);
    return null;
  }
}

export const getAllCategories = async ({pageNumber, pageSize, sortBy, sortOrder}) => {
  try {
    const p = await http.get(`/categories?pageNumber=${pageNumber - 1}&&pageSize=${pageSize}&&sortBy=${sortBy}&&sortOrder=${sortOrder}`, );
    return p.data
  } catch (error) {
    console.error("Failed get category by id:", error);
    return null;
  }
}

export const deleteCategory = async (id) => {
  try {
    const p = await http.delete(`/categories/${id}`);
    return p.data
  } catch (error) {
    console.error("Failed delete category by id:", error);
    return null;
  }
}