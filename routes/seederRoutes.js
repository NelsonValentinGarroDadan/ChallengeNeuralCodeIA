import { Router } from "express";
import * as Controller from "../controllers/seederController.js";

const seederRouter = Router();

seederRouter.post("/", Controller.seeder)

export default seederRouter;