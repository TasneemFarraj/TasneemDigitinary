import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../API/axiosInstance';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
});
// Add Product
export const addProduct = createAsyncThunk('products/add', async (newProduct) => {
  const response = await axiosInstance.post('/products', newProduct);
  return response.data;
});

// Edit Product
export const editProduct = createAsyncThunk('products/edit', async (updatedProduct) => {
  const response = await axiosInstance.put(`/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

// Delete Product
export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  await axiosInstance.delete(`/products/${productId}`);
  return productId;
});