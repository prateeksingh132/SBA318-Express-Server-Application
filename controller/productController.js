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

                <form action="/products/${p.id}?_method=DELETE" method="POST">
                    <button type="submit" class="delete-btn">Delete</button>
                </form>

            </div>
        `;
    }
    productsHtml += `</div>`;

    //////////// TESTING
    // adding this 'add product' form at the bottom of page
    productsHtml += `
        <div class="form-container">
            <h2>Add New Gadget</h2>
            <form action="/products" method="POST">
                <input type="text" name="name" placeholder="Product Name" required />
                <input type="text" name="category" placeholder="Category (laptops/smartphones)" />
                <input type="number" name="price" placeholder="Price" required />
                <button type="submit">Add Item</button>
            </form>
        </div>
    `;
    ////////////

    // TESTING: i am passing to my view engine a title and this html string to put inside #content#
    res.render("index", { title: "Shop Products", content: productsHtml });

};

// create new product
export const createProduct = (req, res, next) => {

    // Goal: I am going to add the ability to add (create) items.

    // logic: simple validation
    // if user didn't send a name or price, we don't add it.
    if (!req.body.name || !req.body.price) {
        // just sendng a error. i will add proper error handling later
        // FUTUREWORK: add proper error handling here
        return res.send("Error: Name and Price are required.");
    }

    const newProduct = {
        // simple id generation: just take length + 1
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category || "General",
        price: req.body.price
    };

    // push to our array (mock db in data.js)
    products.push(newProduct);

    // after adding, go back to the main list so user can see it
    res.redirect("/products");


};

// delete product
// the issue is that to delete an item from an array, i first need to find its index (position).
// i cannot delete directly by id, so i use findindex() to get the position, then splice() to remove it.
// i referred this sample example on stackoverflow that did the same: - https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
export const deleteProduct = (req, res) => {

    // getting the id from the url params
    const id = parseInt(req.params.id);

    // finding which index to delete
    // now, find() will give me the object, findindex(0) gives the position number
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products.splice(index, 1); // remove 1 item at that index

        ////////////TESTING
        // console.log(`Deleted product with id: ${id}`);
        ////////////TESTING
    }

    // after deleting, go back to the list
    res.redirect("/products");

};

// show edit form
export const showEditForm = (req, res) => {

};

// update product (patch)
export const updateProduct = (req, res) => {

};