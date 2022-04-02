const ServerError = require('./ServerError.js');

class MachineryBody {
    constructor (body) {

        if (!body.clientId) {
            throw new ServerError("Lipseste id-ul clientului", 400);
        }

        if (!body.type) {
            throw new ServerError("Lipseste id-ul utilajului", 400);
        }
    
        if (!body.description) {
            throw new ServerError("Lipseste start date-ul", 400);
        }

        if (!body.price) {
            throw new ServerError("Lipseste end date-ul", 400);
        }

        if (!body.startDate) {
            throw new ServerError("Lipseste start date-ul", 400);
        }

        if (!body.endDate) {
            throw new ServerError("Lipseste end date-ul", 400);
        }

        this.clientId = body.clientId;
        this.type = body.type;
        this.description = body.description;
        this.price = body.price;
        this.startDate = body.startDate;
        this.endDate = body.endDate;
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

    get EndDate () {
        return this.endDate;
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
        this.endDate = machinery.enddate;
        this.clientName = machinery.name;
    }
}

module.exports = {
    MachineryBody,
    MachineriesResponse
}