const ServerError = require('./ServerError.js');

class UserBody {
    constructor (body) {

        if (!body.name) {
            throw new ServerError("Lipseste numele", 400);
        }

        if (!body.email) {
            throw new ServerError("Lipseste emailul", 400);
        }
    
        if (!body.password) {
            throw new ServerError("Lipseste parola", 400);
        }

        if (!body.phoneNumber) {
            throw new ServerError("Lipseste numarul de telefon", 400);
        }

        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.phoneNumber = body.phoneNumber;
    }

    get Name () {
        return this.name;
    }
    
    get Email () {
        return this.email;
    }

    get Password () {
        return this.password;
    }

    get PhoneNumber () {
        return this.phoneNumber;
    }
}

class UserRegisterResponse {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
    }
}

class UserLoginResponse {
    constructor(user) {
        this.id = user.id;
        this.token = user.token;
        this.userType = user.userType;
    }
}

class UserPlatformResponse {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.userType = user.usertype;
        this.username = user.username;
        this.password = user.password;
        this.tags = user.tags;
        this.description = user.description;
        this.phoneNumber = user.phonenumber;
    }
}

class UserPlatformAndServiceResponse {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.tags = user.tags;
        this.description = user.description;
        this.phoneNumber = user.phonenumber;
        this.services = user.services;
    }
}

module.exports =  {
    UserBody,
    UserLoginResponse,
    UserRegisterResponse,
    UserPlatformResponse,
    UserPlatformAndServiceResponse
}