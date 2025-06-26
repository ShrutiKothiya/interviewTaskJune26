import axios from 'axios';
import type { Product } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
