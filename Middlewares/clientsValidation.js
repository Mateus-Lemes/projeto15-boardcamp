import db from "../db.js";
import { clientsValidationSchema } from "../schema.js";


export async function createdClientsValidation(req, res, next) {
    
    const { error } = clientsValidationSchema.validate(req.body);
    if (error) {
        return res.sendStatus(400);
    }

    const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [req.body.cpf]);
    if (cpfExist.rows.length !== 0) {
        return res.sendStatus(409);
    }

    next();
}

export async function updatedClientsValidation(req, res, next) {
    
    const { error } = clientsValidationSchema.validate(req.body);
    if (error) {
        return res.sendStatus(400);
    }

    const {id} = req.params;
    const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [req.body.cpf]);
    if (cpfExist.rows.length !== 0 && parseInt(id) !== parseInt(cpfExist.rows[0].id)) {
        return res.sendStatus(409);
    }

    next();
}