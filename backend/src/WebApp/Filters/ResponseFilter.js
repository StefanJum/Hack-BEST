const setResponseDetails = (res, statusCode, responseObject, entityUrl = undefined) => {

    res.status(statusCode);

    console.log(responseObject);
    
    if (entityUrl) {
        res.location(`${entityUrl}/${responseObject.id}`);
    }

    res.json(responseObject);
}

module.exports = {
    setResponseDetails
}