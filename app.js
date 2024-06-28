const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');

const app = express();

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Adjust options as needed
}));

// Sample data for items and their prices
const itemPrices = {
    "Venkata Ramana Doll Set": 400,
    "Doll": 250,
    "Dry Coconut Decoration": 300,
    "Couple Doll Set": 350,
    "Wooden Couple Doll Set": 400,
    "Spun Jewellery": 200,
    "Beads Mat": 250,
    "Tanjore Doll": 350,
    "Beads Bowl": 200
    // Add more items as needed
};

// Route to render home page
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/thanks", function (req, res) {
    res.render("thanks");
});

// Route to render items page
app.get("/items", function (req, res) {
    // You can fetch items from a database or other sources if needed
    res.render("items");
});

app.get("/billing", function (req, res) {
    // You can fetch items from a database or other sources if needed
    res.render("billing");
});

// Handle POST request to add item to cart
app.post('/cart', (req, res) => {
    const itemName = req.body.itemName;
    const itemPrice = getItemPrice(itemName);

    // Initialize cart in session if not already present
    req.session.cartItems = req.session.cartItems || [];

    // Check if item already exists in cart
    const existingItem = req.session.cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
        // Add item to session cart
        req.session.cartItems.push({ name: itemName, price: itemPrice, quantity: 1, totalPrice: itemPrice });
    }

    res.sendStatus(200); // Respond with success status
});

// Handle GET request to render cart page
app.get('/cart', (req, res) => {
    // Retrieve cart items from session
    const cartItems = req.session.cartItems || [];

    // Calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    res.render('cart', { items: cartItems, totalAmount: totalAmount });
});

// Handle POST request to update item quantity in cart
app.post('/updateQuantity', (req, res) => {
    const itemName = req.body.itemName;
    const action = req.body.action;

    // Find item in session cartItems
    const item = req.session.cartItems.find(item => item.name === itemName);

    if (item) {
        if (action === 'increase') {
            item.quantity++;
            item.totalPrice = item.price * item.quantity; // Update total price
        } else if (action === 'decrease') {
            if (item.quantity > 1) {
                item.quantity--;
                item.totalPrice = item.price * item.quantity; // Update total price
            }
        }
    }

    res.redirect('/cart'); // Redirect back to cart page after updating
});

// Handle POST request to remove item from cart
app.post('/removeItem', (req, res) => {
    const itemName = req.body.itemName;

    // Remove item from session cartItems
    req.session.cartItems = req.session.cartItems.filter(item => item.name !== itemName);

    res.redirect('/cart'); // Redirect back to cart page after removing item
});

// Function to get item price based on itemName
function getItemPrice(itemName) {
    return itemPrices[itemName] || 0; // Return 0 if item price not found (handle as needed)
}

// Start server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
