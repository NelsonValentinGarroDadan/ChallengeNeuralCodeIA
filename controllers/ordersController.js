import * as OrderModal from '../services/orders.js';
import { createError } from '../utils/createError.js';

//controlador para obtener todas las ordenes
export const getAllOrders = async (req, res) => {
    const result = await OrderModal.getAllOrders();
    res.status(200).json(result);
};

//controlador para obtener una orden por id
export const getOrderById = async (req, res) => {
    const order_id = req.params.id;
    const result = await OrderModal.getOrderById(order_id);
    if(!result) createError("Orden no encontrada.", 404);
    res.status(200).json(result);
};

export const postOrder = async (req, res) => {
    const newOrder = req.body;
    const result = await OrderModal.postOrder({...newOrder});
    res.status(201).json(result.id);
};