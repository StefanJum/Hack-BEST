const express = require('express');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const OffersRepository = require('../../Infrastructure/Repository/OffersRepository.js');
const { OfferBody, OffersResponse } = require('../Models/Offers.js');

const Router = express.Router();

Router.post('/add', async (req, res) => {

    const offerBody = new OfferBody(req.body);
    const response = await OffersRepository.addOffer(offerBody.clientId, offerBody.machineryId, offerBody.startDate, offerBody.endDate);
	let setValability = await OffersRepository.setFalse(offerBody.machineryId);

    ResponseFilter.setResponseDetails(res, 200, response)
});

Router.post('/addpoints', async (req, res) => {
	//let  = req.body;

	let id = parseInt(req.body.id);
	let points = parseInt(req.body.points);
	let petId = parseInt(req.body.petId)

	console.log(id, points);
	let addPoints = await OffersRepository.addPoints(id, points, petId);
	ResponseFilter.setResponseDetails(res, 200, addPoints);
});

Router.get('/:id/points', async (req, res) => {
	let {
		id
	} = req.params;

	id = parseInt(id);

	const currentPoints = await OffersRepository.getPoints(id);

	ResponseFilter.setResponseDetails(res, 200, currentPoints);
});

Router.get('/:id/client', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    const offers = await OffersRepository.getOffersByClientId(id);
    ResponseFilter.setResponseDetails(res, 200, offers.map(offer => new OffersResponse(offer)));

});

Router.get('/:id/machinery', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    const offers = await OffersRepository.getOffersByMachineryId(id);
    ResponseFilter.setResponseDetails(res, 200, offers.map(offer => new OffersResponse(offer)));

});

Router.get('/:id/for-client', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);
    const offers = await OffersRepository.getOffersForClientId(id);
    ResponseFilter.setResponseDetails(res, 200, offers.map(offer => new OffersResponse(offer)));

});

module.exports = Router;
