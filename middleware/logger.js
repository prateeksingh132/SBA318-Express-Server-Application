/////// Global logging middleware

import dayjs from 'dayjs';

// Goal: create a middleware to log requests.
// similar to the warmup exercise we did in class.


////// Bonus Objectives
// Requirement: Research and use a third-party package.
// i found dayjs is great for formatting dates.
// https://www.npmjs.com/package/dayjs


export function logReq(req, res, next) {

    // using dayjs to format the current time nicely
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // i want to see the method and the url in my terminal so i know what is happening
    console.log(`[${currentTime}] [Request]: ${req.method} ${req.url}`);

    // FUTUREWORK: add log for POST later

    // Important: must call next() otherwise the app gets stuck here and browser keeps spinning
    next();
}