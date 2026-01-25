//////// Global error handling middleware

// Goal: create error handling middleware.
// requirement: tis satisfies the create and use error-handling middleware.

export function globalErr(err, req, res, next) {
    console.error("ERROR CAUGHT:");


    // logic: if the error has a status code, use it, otherwise 500 (server error)
    const status = err.status || 500;
    const message = err.message || "Server Error";


    //////////TESTING
    // console.log('TESTING: ERROR: ', status);
    // console.log('TESTING: ERROR: ', message);
    //////////

    // sending a simple json error response for now, instead of simpole message, i will see if i can refine it later.
    // FUTUREWORK: maybe make a nice error.html view later
    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
}