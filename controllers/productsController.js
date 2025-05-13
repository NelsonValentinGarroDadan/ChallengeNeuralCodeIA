import * as ProductModal from '../services/products.js';
import { createError } from '../utils/createError.js';

//controlador para traer todos los productos
export const getAllProducts = async (req, res) =>{
    const products = await ProductModal.getAllProducts(); 
    res.status(200).json(products);
};

//constrolador para traer un producto por id 
export const getProductById = async (req, res) =>{
    const product_id = req.params.id; 
    const product = await ProductModal.getProductById(product_id);  
    //devolvemos un 404 si no existe ese producto
    if(!product) createError("Producto no encontrado o sin stock.", 404); 

    res.status(200).json(product);
    
};

//constrolador para actualizar un producto
export const updateProduct = async (req, res) => { 
    const product_id = req.params.id;
    const product = req.body; 
    const result = await ProductModal.updateProduct(product_id,{...product});
    //devolvemos un 404 si no existe ese producto
    if(!result) createError("Producto no encontrado.", 404); 
    res.status(200).json(result);
}

//controlador para crear un producto
export const postProduct = async (req, res) => {
    const product = req.body;
    const result = await ProductModal.postProduct(product);
    res.status(201).json(result.id);
}


 