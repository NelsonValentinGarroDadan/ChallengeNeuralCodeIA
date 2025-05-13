import { Router } from "express"; 
import * as Controller from "../controllers/productsController.js"; 
import { productSchema } from "../schemas/productSchema.js";
import { validateSchema } from "../middlewares/validate.js";

const productsRouter = Router();

productsRouter.get("/",Controller.getAllProducts);
productsRouter.get("/:id",Controller.getProductById);
productsRouter.put("/:id",validateSchema(productSchema),Controller.updateProduct);
productsRouter.post("/",validateSchema(productSchema),Controller.postProduct); 

export default productsRouter;
