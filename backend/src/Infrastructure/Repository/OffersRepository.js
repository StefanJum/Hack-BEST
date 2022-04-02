const { queryAsync } = require('..');

const addOffer = async (clientId, petId, startDate) => {
    console.info(`Adding offer with ${clientId} clientId and ${petId} machineryId`);

    const offers = await queryAsync(`
        INSERT INTO oferte(idClient, idPet, perioadaInceputOferta, solved)
        VALUES ($1, $2, $3, $4) RETURNING id`, [clientId, petId, startDate, true]);

    return offers[0];
}

const getOffersByClientId = async (clientId) => {
    console.info(`Getting offers for client ${clientId}`);

    return queryAsync(`SELECT
                        o.id AS id,
                        o.idClient AS clientId,
                        o.idPet AS petId,
                        o.solved AS isSolved,
                        c.nume as name,
			c.numarTelefon as phone,
			o.idHero as hero,
                        u.tip AS type,
                        u.puncte AS points,
                        o.perioadaInceputOferta AS startDate
                    FROM
                        oferte o
                    INNER JOIN pet u ON u.id = o.idPet
                    INNER JOIN clienti c on c.id = u.idClient
                    WHERE o.idClient = $1`, [clientId]);
}

const getOffersForClientId = async (clientId) => {

    return queryAsync(`SELECT 
                        o.id AS id,
                        o.idClient AS clientId,
                        u.id AS petId,
                        c.nume AS name,
                        u.tip AS type,
                        u.puncte AS points,
                        o.perioadaInceputOferta AS startDate
                    FROM oferte o
                    INNER JOIN utilaje u ON o.idPet = u.id
                    INNER JOIN clienti c on c.id = o.idClient
                    WHERE u.idClient = $1`, [clientId]);
}

const getOffersByMachineryId = async (machineryId) => {
    console.info(`Getting offer for machinery ${machineryId}`);

    return queryAsync(`SELECT
                        o.id AS id,
                        o.idClient AS clientId,
                        o.idPet AS petId,
                        o.perioadaInceputOferta AS startDate
                    FROM
                        oferte o
                    WHERE o.idUtilaj = $1`, [machineryId]);
}

const getAllOffers = async () => {

}

module.exports = {
    addOffer,
    getOffersByClientId,
    getOffersByMachineryId,
    getOffersForClientId,
    getAllOffers
}
