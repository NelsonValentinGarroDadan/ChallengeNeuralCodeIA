import { getAllProducts, seederProducts }  from "../services/products.js";
import { seederOrders } from "../services/orders.js";

//seeder para rellenar la db (SI ES QUE NO EXISTE NINGUN DATO)
export const seeder = async (req, res) => {
    await seederProducts(); 
    const products = await getAllProducts();
    const orders = [];
    products.map((product,index)=>{
        console.log(product);
        orders.push(
            {
                customer_name: `Customer ${index}`,
                products:[
                    {
                        product_id: product.id,
                        amount: product.stock / 2,
                    }
                ]
            }
        )
    })
    await seederOrders(orders);
    res.status(201).json({ message: "Productos y ordenes cargados con exito!." })
}
