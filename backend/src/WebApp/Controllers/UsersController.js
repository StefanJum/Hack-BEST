const express = require('express');
const { UserBody } = require('../Models/Users');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const UsersRepository = require('../../Infrastructure/Repository/UsersRepository.js');
const ServerError = require('../Models/ServerError');

const Router = express.Router();

Router.post('/register', async (req, res) => {

    const userBody = new UserBody(req.body);
    const responseUser = await UsersRepository.addUser(userBody.name, userBody.email, userBody.password, userBody.phoneNumber);

    ResponseFilter.setResponseDetails(res, 200, responseUser)
});

Router.post('/login', async (req, res) => {

    const responseUser = await UsersRepository.getUserByEmail(req.body.email);
    
    if (!responseUser) {
        throw new ServerError(`Utilizatorul cu email-ul ${req.body.email} nu exista in sistem!`, 404);
    }

    if (responseUser.password === req.body.password) {
        ResponseFilter.setResponseDetails(res, 200, responseUser);
    } else {
        throw new ServerError('Parola incorecta', 403);
    }
})

module.exports = Router;