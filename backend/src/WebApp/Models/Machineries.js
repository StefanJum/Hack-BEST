const ServerError = require('./ServerError.js');

class MachineryBody {
    constructor (body) {

        if (!body.clientId) {
		//body.clientId = 1;
	    throw new ServerError("Lipseste id-ul clientului", 400);
        }

        if (!body.type) {
            throw new ServerError("Lipseste id-ul animalului", 400);
        }

        if (!body.description) {
            throw new ServerError("Lipseste start date-ul", 400);
        }

        if (!body.price) {
            throw new ServerError("Lipseste recompensa", 400);
        }

        if (!body.startDate) {
            throw new ServerError("Lipseste start date-ul", 400);
        }

        this.clientId = body.clientId;
        this.type = body.type;
        this.description = body.description;
        this.price = body.price;
        this.startDate = body.startDate;
    }

    get ClientId () {
        return this.clientId;
    }
    
    get Type () {
        return this.type;
    }
    
    get Price () {
        return this.price;
    }

    get Description () {
        return this.description;
    }

    get StartDate () {
        return this.startDate;
    }
}

class MachineriesResponse {
    constructor(machinery) {
        this.id = machinery.id;
        this.clientId = machinery.clientid;
        this.type = machinery.type;
        this.description = machinery.description;
        this.isAvailable = machinery.isavailable;
        this.price = machinery.price;
        this.startDate = machinery.startdate;
        this.clientName = machinery.name;
    }
}

module.exports = {
    MachineryBody,
    MachineriesResponse
}
