//////// GadgetShack product controller

// Goal: this file handles the logic for product routes.
// i separated this from the routes file to keep my code organized (modularization).
// this will help in later as well during capstone when logic gets complicated.

import { products } from "../database/data.js";

// get all products (with filtering)
export const getAllProducts = (req, res) => {

    // logic: checking if user clicked a category filter button
    // Requirement: Include query parameters for data filtering
    const categoryQuery = req.query.category;
    let displayProducts = products;

    // filtering logic
    if (categoryQuery) {
        // filter the array
        displayProducts = products.filter(p => p.category === categoryQuery);
    }

    ////////////TESTING
    // console.log("TESTING: Filtered Products:", displayProducts);
    ////////////

    ////////////TESTING
    // TEMPORARY: sending json to test if logic works before building the view
    // i will replace this with res.render later
    // res.json(displayProducts);
    ////////////TESTING

    // Goal: i need to create html string to send to the view engine
    let productsHtml = `<div class="product-grid">`;

    for (let p of displayProducts) {
        productsHtml += `
            <div class="card">
                <h3>${p.name}</h3>
                <p class="price">$${p.price}</p>
                <p class="category">${p.category}</p>
                <p>${p.description}</p>
            </div>
        `;
    }
    productsHtml += `</div>`;

    // TESTING: i am passing to my view engine a title and this html string to put inside #content#
    res.render("index", { title: "Shop Products", content: productsHtml });

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