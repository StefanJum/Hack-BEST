const express = require('express');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const MachineriesRepository = require('../../Infrastructure/Repository/MachineriesRepository.js');
const { MachineryBody, MachineriesResponse } = require('../Models/Machineries.js');

const Router = express.Router();

Router.post('/add', async (req, res) => {

    const machineryBody = new MachineryBody(req.body);
    const response = await MachineriesRepository.addMachinery(machineryBody.clientId, machineryBody.type, machineryBody.description, machineryBody.price, machineryBody.startDate, machineryBody.endDate);

    ResponseFilter.setResponseDetails(res, 200, response)
});

Router.get('/:id/client', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    const machineries = await MachineriesRepository.getMachineriesByClientId(id);
    console.log(machineries);
    ResponseFilter.setResponseDetails(res, 200, machineries.map(machinery => new MachineriesResponse(machinery)));
});

Router.get('/type', async (req, res) => {

    const machineries = await MachineriesRepository.getMachineriesByType(req.body.type);
    ResponseFilter.setResponseDetails(res, 200, machineries.map(machinery => new MachineriesResponse(machinery)));

});

Router.get('/:id/no-client', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    const machineries = await MachineriesRepository.getAllMachineriesExceptYours(id);
    ResponseFilter.setResponseDetails(res, 200, machineries.map(machinery => new MachineriesResponse(machinery)));
})

module.exports = Router;