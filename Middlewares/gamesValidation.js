import db from "../db.js";
import { gameValidationSchema } from "../schema.js";


export async function gamesCreatedValidation(req, res, next) {

    const { error } = gameValidationSchema.validate(req.body);
    if (error) {
        return res.sendStatus(400);
    }

    const idExist = await db.query(`SELECT * FROM categories WHERE id = $1`, [req.body.categoryId]);
    if (idExist.rows.length === 0) {
        return res.sendStatus(400);
    }

    const nameExist = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
    if(nameExist.rows.length !== 0) {
        return res.sendStatus(409);
    }
    next();
}