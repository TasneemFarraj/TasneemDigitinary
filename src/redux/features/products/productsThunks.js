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
