import db from "../db.js";

export async function getAllClientsController(req, res) {
    try {
        const filter  = req.query.cpf;
        if (filter) {
            const filteredClients = await db.query(`
            SELECT * FROM customers 
            WHERE cpf LIKE $1`, 
            [`${filter}%`]
            );
            res.status(200).send(filteredClients.rows);
        } else {
            const allClients = await db.query(`SELECT * FROM customers`);
            res.status(200).send(allClients.rows);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createdClientsController(req, res) {
    try {
        const {name, phone, cpf, birthday} = req.body;
        await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)`, 
        [name, phone, cpf, birthday]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.status(500).send("erro no servidor ao tentar criar um novo cliente");
    }
}

export async function getOneClientController(req, res) {
    try {
        const {id} = req.params
        const client = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if (client.rows.length === 0 ) {
            return res.sendStatus(404);
        }
        res.status(200).send(client.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updatedClientsController(req, res) {
    try {
        const {id} = req.params
        const {name, phone, cpf, birthday} = req.body;
        await db.query(`
        UPDATE customers 
        SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, 
        [name, phone, cpf, birthday, id]);
        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.status(500).send("erro no servidor ao tentar atualizar dados do cliente");
    }
}