//////// Mock Database


// Goal: since we did not learn database yet, i am simulating a database here using arrays.
// i am exporting these arrays so i can import them in my server or controller.
// this satisfies the requirement of "Use at least three different data categories".
// i added some properties that i am gonna use on view. will add more properties later if needed.

// data category 1: Products
export const products = [
    {
        id: 1,
        name: "Gaming Laptop",
        category: "laptops",
        price: 1200,
        description: "High performance gaming laptop with RGB keys.",
        image: "laptop.jpg"
    },
    {
        id: 2,
        name: "Smartphone 5G",
        category: "smartphones",
        price: 800,
        description: "Latest 5G technology with amazing camera.",
        image: "phone.jpg"
    },
    {
        id: 3,
        name: "Wireless Headset",
        category: "audio",
        price: 150,
        description: "Noise cancelling headphones.",
        image: "headset.jpg"
    }
];

// data category 2: users
export const users = [
    {
        id: 1,
        username: "gadgetFan123",
        email: "user1@test.com"
    },
    {
        id: 2,
        username: "techGuru",
        email: "user2@test.com"
    }
];

// data category 3: Reviews (linking users and products)
// logic: this will simulate a relational db, linking user_id and product_id
export const reviews = [
    {
        id: 1,
        productId: 1,
        userId: 1,
        text: "Runs Crysis perfectly.",
        rating: 5
    }
];

///// FUTUREWORK: Add images later..