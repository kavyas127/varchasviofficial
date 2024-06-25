function toggleCart(button) {
    if (button.classList.contains("clicked")) {
        button.innerHTML = "Add to Cart";
        button.classList.remove("clicked");
    } else {
        button.innerHTML = "Added to cart!";
        button.classList.add("clicked");
    }
}