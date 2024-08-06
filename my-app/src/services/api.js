// services/api.js
import axios from 'axios';

const API_URL = '/api';
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (userData) => axios.post(`${API_URL}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/users/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);