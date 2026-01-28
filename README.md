# SBA 318: Express Server Application

## Project: GadgetShack (Backend Layer)

**Brief Description:**

I decided to continue with my "GadgetShack" theme (from my previous SBA 307, 308A, 316 projects). my plan is to have it as my capstone project. this project is the server-side application for my "GadgetShack" e-commerce application. Since we havent learned databases like mongodb yet, I have created a mock database using arrays of objects (for products, users, and reviews) in `data.js`.

my goal was to create a REST API that allows users to view, add, edit and delete products, and i wanted to keep the code organized and modular. i also implemented a view engine (using `fs`) that manipulates HTML templates dynamically, similar to what we did in warmup sba.


# Technology Used

* **Node.js and Express:**
* **Javascript:**
* **HTML/CSS:** i reused my styling theme from **SBA 308A** to keep the blue and orange look consistent.
* **File System (fs):** 
* **Method-Override:** this allows my html forms to send patch/delete requests.
* **Dayjs:** its a third party library for cool time formatting.


# Features and Requirement list

I checked the requirement list one by one and implemented them:

* **RESTFUL Routes:** i implemented `GET`, `POST`, `PATCH`, and `DELETE` routes in `productRoutes.js`.
* **Data Categories:** i used three different data categories:
    1.  **Products:** its the main data (Laptops, Phones).
    2.  **Users:** displayed under the "Community Members" section.
    3.  **Reviews:** displayed at the bottom, where i match the `productId` to the product name.
* **Middleware:**
    * **Custom Middleware 1 (logger):** i created `logger.js` to log every request.
    * **Custom Middleware 2 (404 error handler):** i also added a check in `error.js` that checks invalid urls and sends a "Resource Not Found" error.
    * **Error Handling Middleware:** i created a global error handler (`globalErr`) that catches errors from anywhere in the app.
* **Data Filtering:** i used `req.query` so users can filter products by category (for eg `/products?category=laptops`).
* **View:** i built my view using `index.html` where the client can interact with the data (i implemented forms and buttons for adding/editing/deleting etc).

# View & Client Interaction

i wrote a simple logic in `server.js` using `fs.readFile`. It reads `index.html` and replaces placeholders like `#content#` and `#title#` with dynamic data, similar to what we did in warmup sba.

* **Styling:** I created `style.css`, i reused my styling theme from **SBA 308A** to keep the blue and orange look consistent.
* **Client Interactions:**
    * **Forms:** i created two main forms—one for adding a product (both on home and shop page) and one for editing a product (on the same page with the edit button).
    * **Buttons:** the delete button uses the `method-override` trick (wrapping it in a POST form) to send a DELETE request. the edit button opens up the edit-form.

# How to Use the Application

1.  **Home Page (`/`):**
    * This is the home screen.
    * **Filter:** click the **"Laptops"** or **"Phones"** buttons to filter the list (using query parameters).
    * **Add Item:** scroll down to the "Admin Panel" form. enter name, price and category, then click "Add Item." It will appear in the list instantly.
    * Click the **"Shop Now"** button to enter the main app.
2.  **Shop Page (`/products`):**
    * **View Items:** you will see a list of all products.
    * **Add Item:** similar to home page, we can add the product. scroll down to the "Add new gadget" form. enter name, price and category, then click "Add Item." it will appear in the list instantly.
    * **Delete:** click the red **"Delete"** button on any card to remove it.
    * **Edit:** click the **"Edit"** link to go to the edit page.
3.  **Edit Page (`/products/:id/edit`):**
    * update the price or name in the form and hit "Update item." the page will be redirected back to the shop with the new details saved and displayed.


# API Reference

I created the API to follow standard REST principles. Even though the html form uses `method-override`, the server routes accept standard REST api calls (which I tested).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/products` | Get all products. Has filtering like `?category=laptops`. |
| **POST** | `/products` | Adds a new product. (Data comes from the "Add New Gadget" form). |
| **GET** | `/products/:id/edit` | Shows the form to edit a specific product. |
| **PATCH** | `/products/:id` | Updates an existing product's data. |
| **DELETE** | `/products/:id` | Deletes a product from the mock database. |

### Usage with Postman
i also tested my application with postman. since I used standard routing in `productRoutes.js`, these endpoints work directly in Postman:
* **To Delete:** Send a `DELETE` request to `http://localhost:3000/products/1`
* **To Update:** Send a `PATCH` request with a JSON body.

# Bonus Objectives

### Regex ID Validation
* **File:** `routes/productRoutes.js`. so, i wanted to make sure the app doesnt crash if someone types text into the id spot (like `/products/abc`), a non-number id. i researched and used `router.param()` with a regex (`/^[0-9]+$/`). if the id isn't a number, it throws an 400 error immediately before even reaching the controller. this is practical because it puts a check on id that its a number, and anything else like abc, will result in error and prevents code from crashing

### Third-Party Package: Dayjs
* **File:** `middleware/logger.js`. i found about dayjs that formats the timestamp pretty nicely. i added it in my logger and it made the logs look professional.


# Testing

I have created (and used during code creation) test points (log statement) at multiple places in the code, I have not removed them. They are commented at the time of submission and can be uncommented for future debugging and code check. These code checks looks something like:


////////////TESTING

//console.log('TESTING: assignment: ', assignment);

////////////



# Reflection

**What could you have done differently during the planning stages of your project to make the execution easier?**

i think i should have planned the edit logic better. right from the start i was confused about how to get the data into the edit form. i had a rough logic in my head from the start, i.e to show form and update through same controller, but that did not work. then i moved to the idea to create separate route just to show the form (`GET /:id/edit`) and another one to handle the update (`PATCH /:id`), which also took some time, but worked eventually. also, i took some time debugging why my edit form was sending POST requests instead of PATCH, i could have avoided that by just doing a simple google search from the start.

**Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?**

the `DELETE` and `PATCH` requirements were tricky because i found out that HTML forms dont support them, it only do GET and POST — i wasted time debugging why my edit form was sending POST requests instead of PATCH. i researched some examples and found about `method-override` middleware. well, in future i ll just start with the methos-override.

**What would you add to or change about your application if given more time?**

right now the data is just in a file (`data.js`), so if I restart the server, my changes disappear. there is no data persistence. i would definitely connect this to a real database like mongodb so the data persists. I also want to add a nice error.html view to display the error on browser.

**Use this space to make notes for your future self about anything that you think is important to remember about this process or that may aid you when attempting something similar**

* rememebr, that `router.param` is a cool way to add validation globally so that i dont have to repeat `if` checks in every controller.
* always check if `req.body` is empty, be careful with the udnefined parameters.
* also keep the full error handling  in `error.js` so `server.js` doesnt get cluttered.




# References


I referred to some examples on stackoverflow and others to help me with the logic. Here are the links:

https://stackoverflow.com/questions/72611507/form-delete-method-is-redirecting-to-the-get-method-instead-in-express-js

https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property

https://github.com/expressjs/expressjs.com/issues/388#issuecomment-105719507

https://stackoverflow.com/questions/30471369/express-router-param-validation

https://www.npmjs.com/package/dayjs









