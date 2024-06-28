const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

let cartItems = [];

// Render home page
app.get("/", function (req, res) {
    res.render("home");
});

// Render items page
app.get("/items", function (req, res) {
    res.render("items");
});

// Handle POST request to add item to cart
app.post('/cart', (req, res) => {
    const itemName = req.body.itemName;
    const itemPrice = getItemPrice(itemName);

    // Check if item is already in cart
    const existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
        existingItem.totalPrice = existingItem.price * existingItem.quantity; // Update total price
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1, totalPrice: itemPrice }); // Add new item to cart
    }
    
    res.sendStatus(200); // Respond with success status
});

// Render cart page with cartItems data
app.get('/cart', (req, res) => {
    res.render('cart', { items: cartItems });
});

// Function to get item price based on itemName
function getItemPrice(itemName) {
    return itemPrices[itemName] || 0; // Return 0 if item price not found (handle as needed)
}

// Handle POST request to update item quantity in cart
app.post('/updateQuantity', (req, res) => {
    const itemName = req.body.itemName;
    const action = req.body.action;

    // Find item in cartItems array
    const item = cartItems.find(item => item.name === itemName);

    if (item) {
        if (action === 'increase') {
            item.quantity = item.quantity + 1;
            item.totalPrice = item.price * item.quantity; // Update total price
        } else if (action === 'decrease') {
            if (item.quantity > 1) {
                item.quantity = item.quantity - 1;
                item.totalPrice = item.price * item.quantity; // Update total price
            }
        }
    }

    res.redirect('/cart'); // Redirect back to cart page after updating
});

// Handle POST request to remove item from cart
app.post('/removeItem', (req, res) => {
    const itemName = req.body.itemName;

    // Remove item from cartItems array
    cartItems = cartItems.filter(item => item.name !== itemName);
    
    res.redirect('/cart'); // Redirect back to cart page after removing item
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
