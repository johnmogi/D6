function sendError(response, err) {
    if(config.production) {
        response.status(500).send("Some error occurred, please try again later.");
    }
    if( response.status == 403) { 
        response.status(403).send(err);
    }
    else {
        response.status(500).send(err);
    }
}

module.exports = sendError;
