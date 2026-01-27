
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

// i need method-override to use PUT and DELETE in html forms
import methodOverride from "method-override";

/////// Setups
const PORT = 3000;
const app = express();


////////// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware for method-override
// Logic: so, i found out that html forms only support get and post, but i need delete and put for my REST API
// i found that method-override will let me use a query parameter (like ?_method=DELETE) to kind of trick the server.
// i found this sample example on stackoverflow that did the same: https://stackoverflow.com/questions/72611507/form-delete-method-is-redirecting-to-the-get-method-instead-in-express-js
// i referred this tutorial as well: https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
app.use(methodOverride('_method'));


// my logging middleware (requirement)
app.use(logReq);


/////// View
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


/////// Route




//////////TESTING
app.use("/products", productRoutes);

// app.get("/", (req, res) => {
//     res.send("<h1>TESTING: Server is working!</h1><a href='/products'>Go to Products</a>");
// });
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