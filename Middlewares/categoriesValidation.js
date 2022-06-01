import db from "../db.js";
import { categoriesSchema } from "../schema.js";


export async function validationCreatedCategories(req, res, next) {
    const {name} = req.body;

    const { error } = categoriesSchema.validate({name});

    if (error) {
        console.log(error.details);
        return res.sendStatus(400);
    }

    const nameExist = await db.query(`select * from categories where name = $1`, [name]);
    if (nameExist.rows.length !== 0) {
        return res.status(409).send("Já existe uma categoria com este nome, por favor, escolha outro!");
    }

    next();
}