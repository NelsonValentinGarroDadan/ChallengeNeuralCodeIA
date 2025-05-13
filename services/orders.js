import loop from '../services/db.js'; 
import { createError } from '../utils/createError.js';
import { getOrderItemByIdOrder, postOrderItem } from './ordersItem.js';
import { getProductById, updateProduct } from './products.js';

//funcion para obtener todas las ordenes
export const getAllOrders = async () => {
    const { rows } = await loop.query('SELECT * from orders');
    return rows;
}

//funcion para obtener una orden por id
export const getOrderById = async (order_id) => {
    const { rows } = await loop.query(
        `SELECT 
            o.id AS order_id,
            o.customer_name,
            o.total,
            o.created_at,
            oi.product_id,
            oi.quantity,
            oi.subtotal,
            p.name AS product_name,
            p.price AS product_price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        WHERE o.id = $1`,
        [order_id]
    );

    if (rows.length === 0) createError("Orden no encontrada", 404);

    const { order_id: id, customer_name, total ,created_at} = rows[0];
    const products = rows.map(row => ({
        id: row.product_id,
        name: row.product_name,
        price: row.product_price,
        quantity: row.quantity,
        subtotal: row.subtotal
    }));

    return { id, customer_name, total, products,created_at };
};


//funcion para crear una orden 
export const postOrder = async ( {customer_name, products}) => {
    //iniciamos el total en 0
    let total = 0;
    try {
        //iniciamos la transaccion
        await loop.query('BEGIN');
        //creamos la orden con el total en 0
        let order = await loop.query(
            `INSERT INTO orders (customer_name, total)
            VALUES ($1, $2) RETURNING *`,
            [customer_name,0]
        )
        order = order.rows[0];
        //recorremos el array de productos {product_id:number;amount:number}[]
        for (const { product_id, amount } of products) {
            //obtenemos el producto
            const product = await getProductById(product_id);
            if(!product) createError(`El producto con ID ${product_id} no exite o no tiene stock.`,400)
            //setteamos el subtotal
            const subtotal = product.price * amount;
            //creamos un orderItem por la relacion
            if(product.stock < amount) createError(`El producto con ID ${product_id} no tiene suficiente stock.`,400)
            await postOrderItem({
                order_id: order.id, 
                product_id, 
                quantity: amount, 
                subtotal
            });
            //sumamos el subtotal al total
            total += subtotal;
            await updateProduct(product.id,{...product, stock:product.stock-amount})
        }
        //actualizamos la orden con el total obtenido
        await loop.query(
            'UPDATE orders SET total = $1 WHERE id = $2 RETURNING *',
            [total, order.id]
        );
        //enviamos la transaccion
        await loop.query('COMMIT');
        return order;
    } catch (error) {
        //si ocurre algun error revertimos la transaccion
        await loop.query('ROLLBACK');
        console.error('Error en la transacción:', error.message);
        throw error;
    }
}

export const seederOrders = async (newOrders) => {
    const orders = await getAllOrders();
    if(orders.length > 0) createError("Ya existen datos en la BD, no es necesario un seeder.",400)
    for(const order of newOrders){
        await postOrder({...order});
    };
}