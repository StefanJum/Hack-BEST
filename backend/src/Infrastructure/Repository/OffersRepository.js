const { queryAsync } = require('..');

const addOffer = async (clientId, machineryId, startDate, endDate) => {
    console.info(`Adding offer with ${clientId} clientId and ${machineryId} machineryId`);

    const offers = await queryAsync(`
        INSERT INTO oferte(idClient, idUtilaj, perioadaInceputOferta, perioadaFinalOferta)
        VALUES ($1, $2, $3, $4) RETURNING id`, [clientId, machineryId, startDate, endDate]);
        
    return offers[0];
}

const getOffersByClientId = async (clientId) => {
    console.info(`Getting offers for client ${clientId}`);

    return queryAsync(`SELECT
                        o.id AS id,
                        o.idClient AS clientId,
                        o.idUtilaj AS machineryId,
                        o.acceptata AS isAccepted,
                        c.nume as name,
                        u.tip AS type,
                        u.pret AS price,
                        o.perioadaInceputOferta AS startDate,
                        o.perioadaFinalOferta AS endDate
                    FROM 
                        oferte o
                    INNER JOIN utilaje u ON u.id = o.idUtilaj
                    INNER JOIN clienti c on c.id = u.idClient
                    WHERE o.idClient = $1`, [clientId]);
}

const getOffersForClientId = async (clientId) => {

    return queryAsync(`SELECT 
                        o.id AS id,
                        o.idClient AS clientId,
                        u.id AS machineryId,
                        c.nume AS name,
                        u.tip AS type,
                        u.pret AS price,
                        o.perioadaInceputOferta AS startDate,
                        o.perioadaFinalOferta AS endDate
                    FROM oferte o
                    INNER JOIN utilaje u ON o.idUtilaj = u.id
                    INNER JOIN clienti c on c.id = o.idClient
                    WHERE u.idClient = $1`, [clientId]);
}

const getOffersByMachineryId = async (machineryId) => {
    console.info(`Getting offer for machinery ${machineryId}`);

    return queryAsync(`SELECT
                        o.id AS id,
                        o.idClient AS clientId,
                        o.idUtilaj AS machineryId,
                        o.perioadaInceputOferta AS startDate,
                        o.perioadaFinalOferta AS endDate
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