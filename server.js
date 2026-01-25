
////////////////////// SBA 318: Express Server Application //////////////////////
////// Project: GadgetShack (Backend Layer)


import express from "express";

///////// Import Logging Middleware
import { logReq } from "./middleware/logger.js";

///////// Import Error Handling Middleware
import { globalErr } from "./middleware/error.js";


///////// Import routes


///////// Import file handler


// Import Database


/////// Setups
const PORT = 3000;
const app = express();


/////// (Request) Middleware
// my logging middleware (requirement)
app.use(logReq);


/////// View
// View Engine Creation - creates a view engine, uses .html extension files


// View Engine setup


/////// Route


//////////TESTING
// app.get("/", (req, res) => {
//   res.send("testing read!");
// });
//////////




/////// Error Handling Middleware
// this has to be at the end, after all routes
app.use(globalErr);



/////// Listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});