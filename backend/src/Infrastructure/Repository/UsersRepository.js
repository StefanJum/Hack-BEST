const { queryAsync } = require('..');

const addUser = async (name, email, password, phoneNUmber) => {
    console.info(`Adding user ${name}`);

    const users = await queryAsync(`
        INSERT INTO clienti(nume, email, parola, numarTelefon, nrPuncte)
        VALUES ($1, $2, $3, $4, $5) RETURNING id, nume`, [name, email, password, phoneNUmber, 0]);
        
    return users[0];
}

const getUserByEmail = async (email) => {
    console.info(`Getting user with email ${email}`);

    const users = await queryAsync(`
        SELECT c.id, c.nume AS name, c.email AS email, c.parola AS password
        FROM clienti c
        WHERE c.email = $1`, [email]);

    return users[0];
}

module.exports = {
    addUser,
    getUserByEmail
}
