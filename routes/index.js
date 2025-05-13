import { Router } from "express";
import productsRouter from "./productsRoutes.js";
import ordersRouter from "./ordersRoutes.js";
import seederRouter from "./seederRoutes.js";

const routes = (app)=>{
    app.use("/products",productsRouter);
    app.use("/orders",ordersRouter);
    app.use("/seeder",seederRouter);
}
export default routes;