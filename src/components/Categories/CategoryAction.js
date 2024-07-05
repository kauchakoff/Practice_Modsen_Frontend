import {http} from "../../utils/http";

export const addNewCategory = async (values) => {
  const categoryData = {
    id: null,
    name: values.name,
  }
  const p = await http.post('/categories', categoryData);
  return p.data
}

export const getCategoryById = async (id) => {
  const p = await http.get(`/categories/${id}`);
  return p.data
}

export const updateCategory = async (id, data,) => {
  const categoryData = {
    id: data.id,
    name: data.name,
  }
  const p = await http.put(`/categories`, categoryData);
  return p.data
}

export const getAllCategories = async ({pageNumber, pageSize, sortBy, sortOrder}) => {
  const p = await http.get(`/categories?pageNumber=${pageNumber - 1}&&pageSize=${pageSize}&&sortBy=${sortBy}&&sortOrder=${sortOrder}`,);
  return p.data
}

export const deleteCategory = async (id) => {
  const p = await http.delete(`/categories/${id}`);
  return p.data

}