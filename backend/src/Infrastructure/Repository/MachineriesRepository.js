const { queryAsync } = require('..');

const addMachinery = async (clientId, type, description, price, startDate) => {
    console.info(`Adding machinery for ${clientId} clientId`);

	//FIXME
    const offers = await queryAsync(`
        INSERT INTO pet(idClient, tip, descriere, puncte, valabil, perioadaInceput)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [clientId, type, description, price, true, startDate]);

    return offers[0];
}

const getMachineriesByClientId = async (clientId) => {
    console.info(`Getting machineries for client ${clientId}`);

    return queryAsync(`SELECT
                        u.id AS id,
                        u.idClient AS clientId,
                        u.tip AS type,
                        u.descriere AS description,
                        u.puncte AS price,
                        u.valabil as isAvailable,
                        u.perioadaInceput AS startDate
                    FROM
                        pet u
                    WHERE u.idClient = $1`, [clientId]);
}

const getAllMachineriesExceptYours = async (clientId) => {
    console.info(`Getting machineries not for client ${clientId}`);

    return queryAsync(`SELECT
                        u.id AS id,
                        u.idClient AS clientId,
                        u.tip AS type,
                        c.nume AS name,
                        u.descriere AS description,
                        u.puncte AS price,
                        u.valabil AS isAvailable,
                        u.perioadaInceput AS startDate
                    FROM 
                        pet u
                    INNER JOIN clienti c on u.idClient = c.id
                    WHERE u.idClient != $1`, [clientId]);
}

const getMachineriesByType = async (type) => {
    console.info(`Getting machineries with type ${type}`);

    return queryAsync(`SELECT
                        u.id AS id,
                        u.idClient AS clientId,
                        u.tip AS type,
                        u.descriere AS description,
                        u.puncte AS price,
                        u.valabil AS isAvailable,
                        u.perioadaInceput AS startDate
                    FROM
                        pet u
                    WHERE u.tip = $1`, [type]);
}

module.exports = {
    addMachinery,
    getMachineriesByClientId,
    getAllMachineriesExceptYours,
    getMachineriesByType
}
