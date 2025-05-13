import loop from '../services/db.js';

//funcion para crear un orderItem
export const postOrderItem = async ({order_id, product_id, quantity, subtotal}) => {
    const { rows } = await loop.query(
        `INSERT INTO order_items (order_id, product_id, quantity, subtotal)
        VALUES ($1, $2, $3, $4)`,
        [order_id, product_id, quantity, subtotal]
    )
    return rows[0];
};

//funcion para obtener un orderItem segun el id de la orden
export const getOrderItemByIdOrder = async (order_id) => {
    const { rows } = await loop.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order_id]
    );
    return rows;
}