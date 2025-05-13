import { Router } from "express";
import * as Controller from '../controllers/ordersController.js' 
import { validateSchema } from "../middlewares/validate.js";
import { orderSchema } from "../schemas/orderSchema.js";
const ordersRouter = Router();

ordersRouter.get("/",Controller.getAllOrders);
ordersRouter.get("/:id",Controller.getOrderById);
ordersRouter.post("/",validateSchema(orderSchema),Controller.postOrder);

export default ordersRouter;