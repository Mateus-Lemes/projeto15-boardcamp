import db from "../db.js"

export async function getGamesController(req, res) {
    try {
        let filter = req.query.name;
        if (filter) {
            filter = filter.toLowerCase();
            const filteredGames = await db.query(`
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories
            ON games."categoryId" = categories.id
            WHERE lower(games.name) LIKE $1`, [`${filter}%`]);
            return res.status(200).send(filteredGames.rows);
        } else {
            const allGames = await db.query(`
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories
            ON games."categoryId" = categories.id`);
            return res.status(200).send(allGames.rows);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("erro no servidor de jogos");
    }
}

export async function createdGameController(req, res) {
    try {
        const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
        await db.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send("erro no servidor ao tentar criar o jogo");
    }
}