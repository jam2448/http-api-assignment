
const respond = (request, response, content, status, type) => {

    response.writeHead(status, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    response.write(content);
    response.end();
};

const success = (request, response) => {

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> This is a successful response </message>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 200, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'This is a successful response',
            id: 'success',
        };

        const jsonString = JSON.stringify(responseJSON);

        console.log(jsonString);
        return respond(request, response, jsonString, 200, 'application/json');
    }

};


const badRequest = (request, response) => {
    if (!request.query.valid || request.query.valid !== 'true') {

        if (request.acceptedTypes[0] === 'text/xml') {
            let responseXML = `<response>`;
            responseXML += `<message> Missing valid query string parameter set to true </message>`;
            responseXML += `<id>badRequest</id>`;
            responseXML += `</response>`;

            console.log(responseXML);
            return respond(request, response, responseXML, 400, 'text/xml');
        }
        else {

            let responseJSON = {
                message: 'Missing valid query string parameter set to true',
                id: 'badRequest',
            };
            const jsonString = JSON.stringify(responseJSON);

            return respond(request, response, jsonString, 400, 'application/json');
        }
    }

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> This request has the required parameters </message>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 200, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'This request has the required parameters',
        };
        const jsonString = JSON.stringify(responseJSON);

        return respond(request, response, jsonString, 200, 'application/json');
    }


};

const unauthorized = (request, response) => {
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {

        if (request.acceptedTypes[0] === 'text/xml') {
            let responseXML = `<response>`;
            responseXML += `<message> Missing loggedIn query parameter set to yes </message>`;
            responseXML += `<id>unauthorized</id>`;
            responseXML += `</response>`;

            return respond(request, response, responseXML, 401, 'text/xml');
        }
        else {

            let responseJSON = {
                message: 'Missing loggedIn query parameter set to yes',
                id: 'unauthorized',
            };

            const jsonString = JSON.stringify(responseJSON);

            return respond(request, response, jsonString, 401, 'application/json');
        }
    }

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> This request has the required parameters </message>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 200, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'This request has the required parameters',
        };

        const jsonString = JSON.stringify(responseJSON);
        return respond(request, response, jsonString, 200, 'application/json');
    }

};

const forbidden = (request, response) => {

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> You do not have access to this content </message>`;
        responseXML += `<id>forbidden</id>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 403, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'You do not have access to this content',
            id: 'forbidden',
        };

        const jsonString = JSON.stringify(responseJSON);
        return respond(request, response, jsonString, 403, 'application/json');
    }

};

const internal = (request, response) => {

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> Internal Server Error. Something went wrong </message>`;
        responseXML += `<id>internal</id>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 500, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'Internal Server Error. Something went wrong',
            id: 'internalError',
        };
        const jsonString = JSON.stringify(responseJSON);
        return respond(request, response, jsonString, 500, 'application/json');
    }
};

const notImplemented = (request, response) => {

    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> A get request for this page has not been implemented yet. Check again later for updated content </message>`;
        responseXML += `<id>notImplemented</id>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 501, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'A get request for this page has not been implemented yet. Check again later for updated content',
            id: 'notImplemented',
        };

        const jsonString = JSON.stringify(responseJSON);

        return respond(request, response, jsonString, 501, 'application/json');
    }

};


//if the user did not enter a valid page, return 404
const notFoundPage = (request, response) => {

    if (request.acceptedTypes && request.acceptedTypes[0] === 'text/xml') {
        let responseXML = `<response>`;
        responseXML += `<message> The page you are looking for was not found </message>`;
        responseXML += `<id>notFound</id>`;
        responseXML += `</response>`;

        return respond(request, response, responseXML, 404, 'text/xml');
    }
    else {

        let responseJSON = {
            message: 'The page you are looking for was not found',
            id: 'notFound',
        };

        const jsonString = JSON.stringify(responseJSON);

        return respond(request, response, jsonString, 404, 'application/json');
    }

};

module.exports = {
    notFoundPage,
    badRequest,
    success,
    unauthorized,
    forbidden,
    internal,
    notImplemented,

};