import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./Routes/categoriesRouter.js";
import gamesRouter from "./Routes/gamesRouter.js";
import clientsRouter from "./Routes/clientsRouter.js";
import rentalsRouter from "./Routes/rentalsRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter, gamesRouter, clientsRouter, rentalsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log("o servidor está de pé na porta " + PORT + "!"));