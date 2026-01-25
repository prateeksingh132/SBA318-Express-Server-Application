/////// Global logging middleware

// Goal: create a middleware to log requests.
// similar to the warmup exercise we did in class.


export function logReq(req, res, next) {
    // i want to see the method and the url in my terminal so i know what is happening
    console.log(`[Request]: ${req.method} ${req.url}`);

    // FUTUREWORK: add log for POST later

    // Important: must call next() otherwise the app gets stuck here and browser keeps spinning
    next();
}