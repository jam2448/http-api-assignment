const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/badRequest': responseHandler.badRequest,
    '/success': responseHandler.success,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    '/style.css': htmlHandler.getCSS,
    notFound: responseHandler.notFoundPage,
}

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    //take parameters from the search and turn it into an object 

    request.query = Object.fromEntries(parsedURL.searchParams);

    console.log(request.headers.accept);

    if (request.headers.accept) {
        request.acceptedTypes = request.headers.accept.split(',');
    }


    if (urlStruct[parsedURL.pathname]) {
        urlStruct[parsedURL.pathname](request, response);
    } else {
        urlStruct.notFound(request, response);
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});
