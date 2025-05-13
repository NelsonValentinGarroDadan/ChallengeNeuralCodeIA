import { createError } from '../utils/createError.js';
import pool from './db.js';

//funcion para traer todos los productos
export const getAllProducts = async () =>{  
    const { rows } = await pool.query('SELECT * FROM products WHERE stock > 0');
    return rows;
};  

//funcion para trar un producto por id
export const getProductById = async (product_id) => { 
   const { rows } = await pool.query(
        'SELECT * FROM products WHERE id = $1 AND stock > 0',
        [product_id]
    );
   return rows[0];
}

//funcion para actualizar un producto
export const updateProduct = async (product_id, {name,price,stock}) => { 
    const { rows } = await pool.query(
        `UPDATE products SET 
        name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *`,
        [name,price,stock,product_id]
    );
    return rows[0];
}

//funcion para crear un producto
export const postProduct = async ({name,price,stock}) => {
    const { rows } = await pool.query(
        `INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *`,
        [name,price,stock]
    )
    return rows[0];
}

//funcion seeder de productos
export const seederProducts = async () => {
    const products = await getAllProducts();
    if( products.length > 0 ) createError("Ya existen datos en la BD, no es necesario un seeder.", 400);
     const newProducts = [
      { name: 'Producto A', price: 100, stock: 10 },
      { name: 'Producto B', price: 200, stock: 20 },
      { name: 'Producto C', price: 300, stock: 30 },
      { name: 'Producto D', price: 400, stock: 40 },
      { name: 'Producto E', price: 500, stock: 50 },
      { name: 'Producto F', price: 600, stock: 60 },
    ];

    newProducts.map(async ({ name, price, stock }) => {
      await pool.query(
        `INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)`,
        [name, price, stock]
      );
    })
}