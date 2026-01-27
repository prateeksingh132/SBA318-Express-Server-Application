
////////////////////// SBA 318: Express Server Application //////////////////////
////// Project: GadgetShack (Backend Layer)


////////////////////////////////////////// Imports
////////////////////////////////////////// 
import express from "express";

///////// Import Logging Middleware
import { logReq } from "./middleware/logger.js";

///////// Import Error Handling Middleware
import { globalErr, error404 } from "./middleware/error.js";

///////// Import routes
import productRoutes from "./routes/productRoutes.js";

///////// Import file handler
import fs from "fs";

// Import Database
import { products, users, reviews } from "./database/data.js";

// i need method-override to use PUT and DELETE in html forms
import methodOverride from "method-override";


////////////////////////////////////////// Setups
////////////////////////////////////////// 
const PORT = 3000;
const app = express();


//////////////////////////////////////// Middleware
////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware for method-override
// Logic: so, i found out that html forms only support get and post, but i need delete and put for my REST API
// i found that method-override will let me use a query parameter (like ?_method=DELETE) to kind of trick the server.
// i found this sample example on stackoverflow that did the same: https://stackoverflow.com/questions/72611507/form-delete-method-is-redirecting-to-the-get-method-instead-in-express-js
// i referred this tutorial as well: https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
app.use(methodOverride('_method'));


// my logging middleware (requirement) - Custome middleware # 1
app.use(logReq);


//////////////////////////////////////// View
//////////////////////////////////////// 
// logic: creating a view engine to read .html files
// i am using the exact logic from the warmup SBA here.
app.engine("html", function (filePath, options, cb) {
    fs.readFile(filePath, (err, content) => {
        if (err) return cb(err);

        // i am converting the content to string so i can replace text
        let rendered = content.toString();

        // replacing #title# and #content# placeholders in my html
        // checking if options have title or content passed from the route
        if (options.title) {
            rendered = rendered.replace("#title#", options.title);
        }

        if (options.content) {
            rendered = rendered.replace("#content#", options.content);
        }

        // return the final html string
        return cb(null, rendered);
    });
});

// View Engine setup
app.set("views", "./views");
app.set("view engine", "html");
app.use(express.static("./styles")); // serve static files from the styles directory
app.use(express.static("./images"));


//////////////////////////////////////// Route
//////////////////////////////////////// 
// homepage route of my view
// creating the base route for my homepage here. it has links to the products page
// i am creating my homepage html content here dynamically to inject into my view (index.html)
// i have also added 3 filter buttons just like SBA 308A, to filter all products, laptops and phones based on categories.
app.get("/", (req, res) => {
    
    let homeHtml = `
        <div class="hero">
            <h1>Welcome to GadgetShack API</h1>
            <p>Upgrade your tech life today.</p>
            <div class="hero-actions">
                <a href="/products" class="btn shop-btn">View All Products</a>
                <a href="/products?category=laptops" class="btn filter-btn">Laptops</a>
                <a href="/products?category=smartphones" class="btn filter-btn">Phones</a>
            </div>
            
            <div class="add-section">
                <h3>Admin Panel: Add New</h3>
                <form action="/products" method="POST" class="add-form">
                    <input type="text" name="name" placeholder="Product Name" required />
                    <input type="text" name="category" placeholder="Category" required />
                    <input type="number" name="price" placeholder="Price" required />
                    <button type="submit">Add Item</button>
                </form>
            </div>
        </div>
    `;

    res.render("index", { title: "Home", content: homeHtml });

});

////////////TESTING
// app.get("/", (req, res) => {
//     res.send("<h1>TESTING: Server is working!</h1><a href='/products'>Go to Products</a>");
// });
////////////TESTING


// product page route of my view
app.use("/products", productRoutes);

////////////TESTING
// app.get("/", (req, res) => {
//   res.send("testing read!");
// });
////////////TESTING


//////////////////////////////////////// Error Handling Middleware
////////////////////////////////////////
// this has to be at the end, after all routes

// 404 Handler - Custom middleware # 2
// this will run when no route above matches the url
app.use(error404);

// Requirement: Create and use error-handling middleware.
// Global error handler: this will catch any errors passed from error404 or other routes
app.use(globalErr);



////////////////////////////////////////// Listener
////////////////////////////////////////// 
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});