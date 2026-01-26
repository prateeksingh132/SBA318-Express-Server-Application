
////////////////////// SBA 318: Express Server Application //////////////////////
////// Project: GadgetShack (Backend Layer)


import express from "express";

///////// Import Logging Middleware
import { logReq } from "./middleware/logger.js";

///////// Import Error Handling Middleware
import { globalErr } from "./middleware/error.js";


///////// Import routes
import productRoutes from "./routes/productRoutes.js";

///////// Import file handler
import fs from "fs";

// Import Database
import { products, users, reviews } from "./database/data.js";

/////// Setups
const PORT = 3000;
const app = express();


////////// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// my logging middleware (requirement)
app.use(logReq);


/////// View
// View Engine Creation - creates a view engine, uses .html extension files


// View Engine setup


/////// Route




//////////TESTING
//app.use("/products", productRoutes);
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