const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
require('express-async-errors');
require('log-timestamp');

const routes = require('./WebApp/Controllers');

const ServerError = require('./WebApp/Models/ServerError.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        let status = 500;
        let message = 'Something Bad Happened';
        if (err instanceof ServerError) {
            message = err.Message;
            status = err.StatusCode;
        }
        return next(createError(status, message));
    }
});

const port = process.env.PORT || 4200;

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});