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


// route definitions
router.get("/", getAllProducts);           // get all products
router.post("/", createProduct);           // create new product
router.get("/:id/edit", showEditForm);     // show edit form
router.patch("/:id", updateProduct);       // update product
router.delete("/:id", deleteProduct);      // delete product

export default router;