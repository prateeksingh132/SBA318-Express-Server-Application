//////// GadgetShack product controller

// Goal: this file handles the logic for product routes.
// i separated this from the routes file to keep my code organized (modularization).
// this will help in later as well during capstone when logic gets complicated.

import { products, users, reviews } from "../database/data.js";

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

    // Requirement: Use at least three different data categories (e.g., users, posts, or comments).
    // i have three different data categories: Product, User and Reviews. imported user, reviews and product from my mock db data.js
    // i am gonna use and display all three of them on my view
    // Goal: i need to create html string to send to the view engine
    let productsHtml = `<div class="product-cards-div">`;

    for (let p of displayProducts) {
        productsHtml += `
            <div class="card">
                <h3>${p.name}</h3>
                <img src="${p.image}" alt="${p.name}" class="itemImage">
                <p class="price">$${p.price}</p>
                <p class="category">${p.category}</p>
                <p class="card-description">${p.description}</p>

                <form action="/products/${p.id}?_method=DELETE" method="POST">
                    <button type="submit" class="delete-btn">Delete</button>
                </form>

                <a href="/products/${p.id}/edit" class="edit-link">Edit</a>

            </div>
        `;
    }
    productsHtml += `</div>`;


    // User section
    productsHtml += `
        <div class="extra-data-container">
            <h2>Community Members</h2>
            <ul class="data-list">
    `;
    // looping through users array
    for (const u of users) {
        productsHtml += `<li><strong>${u.username}</strong> (${u.email})</li>`;
    }
    productsHtml += `</ul></div>`;

    // Reviews section
    // listing reviews
    productsHtml += `
        <div class="extra-data-container">
            <h2>Recent Reviews</h2>
            <div class="reviews-cards-div">
    `;
    // looping through reviews array
    for (const r of reviews) {
        // finding the product name to add below the review as context
        const product = products.find(p => p.id === r.productId);
        const productName = product ? product.name : "Unknown Item";

        productsHtml += `
            <div class="review-item-box">
                <p><strong>Rating:</strong> ${r.rating}/5 ⭐</p>
                <p>"${r.text}"</p>
                <small>For: ${productName}</small>
            </div>
        `;
    }
    productsHtml += `</div></div>`;



    // adding this 'add product' form at the bottom of page
    // Requirement: Create and use error-handling middleware.
    // Note: I have removed the 'required' from the add-product form below so that i can show error handling middleware usage. 
    productsHtml += `
        <div class="form-container">
            <h2>Add New Gadget</h2>
            <form action="/products" method="POST">
                <input type="text" name="name" placeholder="Product Name"  />
                <input type="text" name="category" placeholder="Category (laptops/smartphones)" />
                <input type="number" name="price" placeholder="Price"  />
                <button type="submit">Add Item</button>
            </form>
        </div>
    `;
    ////////////

    // i am passing to my view engine a title and this html string to put inside #content#
    res.render("index", { title: "Shop Products", content: productsHtml });

};

// create new product
export const createProduct = (req, res, next) => {

    // Goal: I am going to add the ability to add (create) items.

    // Requirement: Create and use error-handling middleware.
    try {

        // logic: simple validation
        // if user didn't send a name or price, we don't add it.
        if (!req.body.name || !req.body.price) {
            // creating an error object with status and message
            const err = new Error("Name and Price are required!!!!!");
            err.status = 400;
            throw err; // sending to error middleware
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

    } catch (error) {

        next(error);

    }

};

// delete product
// the issue is that to delete an item from an array, i first need to find its index (position).
// i cannot delete directly by id, so i use findindex() to get the position, then splice() to remove it.
// i referred this sample example on stackoverflow that did the same: - https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
// also dont forget about this link which i put on server.js which gave an example of using method-override: https://stackoverflow.com/questions/72611507/form-delete-method-is-redirecting-to-the-get-method-instead-in-express-js
export const deleteProduct = (req, res) => {

    // getting the id from the url params
    const id = parseInt(req.params.id);

    // finding which index to delete
    // now, find() will give me the object, findindex(0) gives the position number
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products.splice(index, 1); // remove 1 item at that index

        ////////////TESTING
        // console.log(`TESTING: Deleted product with id: ${id}`);
        ////////////TESTING
    }

    // after deleting, go back to the list
    res.redirect("/products");

};



/////////// Update/Patch 
// Goal: so the idea is that the i am gonna create an edit button in each product card. when i clicks edit,the server has to find the item and it shows a form filled with the old data
// and then i can update and when i clicks updtae button, the server has to find the item again, overwrite the old data with new data, and save it
// thas why i have divided the whole logic of update/patch into two parts: show edit form, update the product

// show edit form
// Goal: find the product by id and then show a form filled with its data
export const showEditForm = (req, res) => {

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    // if wrong id is entered
    if (!product) return res.send("Product not found");

    // creating a specific form just for editing
    // Important: HTML forms dont support patch, so i m gonna use the ?_method=PATCH again just like in delete controller using method-override middleware
    // so when we click submit, it sends the data to /products/productId and kind of simulates a patch request.
    // Note: i tested and noticed that the form initially is empty, so i dont know what to change in it. thats why, i needed to populate the input with exisiting data, else its confusing, so used value = ""
    let editForm = `
        <div class="form-container">
            <h2>Edit ${product.name}</h2>
            <form action="/products/${product.id}?_method=PATCH" method="POST">
                <label>Name:</label>
                <input type="text" name="name" value="${product.name}" />
                <br>
                <label>Price:</label>
                <input type="number" name="price" value="${product.price}" />
                <br>
                <button type="submit">Update Item</button>
            </form>
            <a href="/products">Cancel</a>
        </div>
    `;

    res.render("index", { title: "Edit Product", content: editForm });


};

// 2. update product
// Goal: actually update the data in our array
// i tested and i noticed that once the showeditform finishes, server forgot everything, its kind of a brand new event, thats why i have to search product again, look at the url and parse the id and then search the array to find the product object, all over again.
// once i find the product object from the array, then i change the updated properties
export const updateProduct = (req, res) => {

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);


    // i tested and the server shows error if i enter a wrong id, so i need to put a check here. make sense bcuz we cant send an update request for product that doesnt exist.
    if (product) {
        // so if i only update one property, it kind of deletes the other prperty and put undefined in it. 
        // thats why i need to add check here in case one of the properties were not updated, i update only propteries that were changed and sent
        // so, only update properties if they were sent in the body
        if (req.body.name) product.name = req.body.name;
        if (req.body.price) product.price = req.body.price;

        ////////////TESTING
        // console.log(`TESTING: Updated product ${id} with new data..`);
        ////////////

    }

    // after updating, go back to the list
    res.redirect("/products");


};