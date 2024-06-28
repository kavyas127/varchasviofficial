function toggleCart(button) {
    if (button.classList.contains("clicked")) {
        button.innerHTML = "Add to Cart";
        button.classList.remove("clicked");
    } else {
        button.innerHTML = "Added to cart!";
        button.classList.add("clicked");
    }
}

function addToCart(formId) {
    const form = document.getElementById(formId);
    const itemName = form.elements.itemName.value;
    const itemPrice = getItemPrice(itemName);

    // Perform AJAX request to add item to cart
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/cart');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Item added to cart:', itemName);
            // Optional: Update UI to indicate item added to cart (e.g., change button style)
            const button = form.querySelector('.add-cart');
            button.classList.add('clicked');
        } else {
            console.log('Error adding item to cart:', xhr.statusText);
        }
    };
    xhr.send(`itemName=${encodeURIComponent(itemName)}`);
}

// Function to get item price based on itemName (mock implementation)
function getItemPrice(itemName) {
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
    return itemPrices[itemName];
}
