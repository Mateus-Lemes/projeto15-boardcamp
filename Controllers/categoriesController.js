import db from "../db.js";

export async function categoriesCreatedController(req, res) {
    try {
        const {name} = req.body
        await db.query(`insert into categories (name) values ($1)`, [name]);
        res.status(201).send("Categoria criada com sucesso!");
    } catch (error) {
        res.status(500).send("erro 500");
    }
}

export async function getCategoriesController(req, res) {
    try {
        const categories = await db.query(`select * from categories`);
        res.send(categories.rows);
    } catch (error) {
        console.log(error.details);
        res.status(500).send("erro 500");
    }
}