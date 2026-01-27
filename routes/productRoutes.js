/////// API logic: All routes logic for gadgetshack product page

import express from "express";

// instance of router
const router = express.Router();

// importing the controller logic
// keeping my routes clean...
import {
    getAllProducts,
    createProduct,
    deleteProduct,
    showEditForm,
    updateProduct
} from "../controller/productController.js";


////// Bonus Objectives
// Requirement: Include a practical usage of regular expressions within route paths.
// so the idea is that i am gonna use router.param to validate the id, that it is only numbers (0-9).
// so, if a user goes to /products/abc, this regex check will fail and sends it to the error handler.
// now, this is practical because it puts a check on id that its a number, and anything else like abc, will result in error and prevents code from crashing
// i referred these examples on these links : https://github.com/expressjs/expressjs.com/issues/388#issuecomment-105719507
// this Q/A series on the link is part of larger stackoverflow post : https://stackoverflow.com/questions/30471369/express-router-param-validation
router.param('id', (req, res, next, id) => {
    // Regex: ^ means start, [0-9]+ means one or more digits, $ means end
    const idRegex = /^[0-9]+$/;

    if (!idRegex.test(id)) {
        const err = new Error("Regex Validation Failed: Invalid ID: Parameter must be a number!!");
        err.status = 400; // bad request
        return next(err);
    }

    // if it passes the regex, continue to the route
    next();
});



// route definitions
router.get("/", getAllProducts);           // get all products
router.post("/", createProduct);           // create new product
router.get("/:id/edit", showEditForm);     // show edit form
router.patch("/:id", updateProduct);       // update product
router.delete("/:id", deleteProduct);      // delete product

export default router;