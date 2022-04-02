const Router = require('express')();

const UsersController = require('./UsersController');
const OffersController = require('./OffersController');
const MachineriesController = require('./MachineriesController');

Router.use('/users', UsersController);
Router.use('/offers', OffersController);
Router.use('/machinery', MachineriesController);

module.exports = Router;