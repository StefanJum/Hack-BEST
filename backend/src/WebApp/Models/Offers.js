const ServerError = require('./ServerError.js');

class OfferBody {
    constructor (body) {

        if (!body.clientId) {
            throw new ServerError("Lipseste id-ul clientului", 400);
        }

        if (!body.machineryId) {
            throw new ServerError("Lipseste id-ul utilajului", 400);
        }
    
        if (!body.startDate) {
            throw new ServerError("Lipseste start date-ul", 400);
        }

        if (!body.endDate) {
            throw new ServerError("Lipseste end date-ul", 400);
        }

        this.clientId = body.clientId;
        this.machineryId = body.machineryId;
        this.startDate = body.startDate;
        this.endDate = body.endDate;
    }

    get ClientId () {
        return this.clientId;
    }
    
    get MachineryId () {
        return this.machineryId;
    }

    get StartDate () {
        return this.startDate;
    }

    get EndDate () {
        return this.endDate;
    }
}

class OffersResponse {
    constructor(offer) {
        this.id = offer.id;
        this.clientId = offer.clientid;
        this.machineryId = offer.machineryid;
        this.isAccepted = offer.isaccepted;
        this.price = offer.price;
        this.type = offer.type;
        this.startDate = offer.startdate;
        this.endDate = offer.enddate;
        this.clientName = offer.name;
    }
}

class OfferMachineryResponse {
    consturctor(offer) {
        this.id = offer.id;
        this.idClient = offer.idclient;
        this.machineryId = offer.id;
        this.type = offer.type;
        this.price = offer.price;
        this.StartOfferDate = offer.startdate;
        this.EndOfferDate = offer.enddate;
    }
}

module.exports = {
    OfferBody,
    OffersResponse,
    OfferMachineryResponse
}