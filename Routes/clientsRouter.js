import { Router } from "express";
import { createdClientsController, getAllClientsController, getOneClientController, updatedClientsController } from "../Controllers/clientsController.js";
import { createdClientsValidation, updatedClientsValidation } from "../Middlewares/clientsValidation.js";

const clientsRouter = Router();

clientsRouter.get("/customers", getAllClientsController);
clientsRouter.get("/customers/:id", getOneClientController);
clientsRouter.post("/customers", createdClientsValidation, createdClientsController);
clientsRouter.put("/customers/:id", updatedClientsValidation, updatedClientsController);

export default clientsRouter;