//////// GadgetShack product controller

// Goal: this file handles the logic for product routes.
// i separated this from the routes file to keep my code organized (modularization).
// this will help in later as well during capstone when logic gets complicated.

import { products } from "../database/data.js";

// get all products (with filtering)
export const getAllProducts = (req, res) => {

    // logic: checking if user clicked a category filter button
    const categoryQuery = req.query.category;
    let displayProducts = products;

    if (categoryQuery) {
        // filter the array
        displayProducts = products.filter(p => p.category === categoryQuery);
    }

    ////////////TESTING
    // console.log("TESTING: Filtered Products:", displayProducts);
    ////////////

    // TEMPORARY: sending json to test if logic works before building the view
    // i will replace this with res.render later
    res.json(displayProducts);

};

// create new product
export const createProduct = (req, res, next) => {

};

// delete product
export const deleteProduct = (req, res) => {

};

// show edit form
export const showEditForm = (req, res) => {

};

// update product (patch)
export const updateProduct = (req, res) => {

};