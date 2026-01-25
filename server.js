
////////////////////// SBA 318: Express Server Application //////////////////////
////// Project: GadgetShack (Backend Layer)


import express from "express";

///////// Import Logging Middleware


///////// Import routes


///////// Import file handler


// Import Database


/////// Setups
const PORT = 3000;
const app = express();


/////// (Request) Middleware


/////// View
// View Engine Creation - creates a view engine, uses .html extension files


// View Engine setup


/////// Route




/////// Error Handling Middleware




/////// Listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});