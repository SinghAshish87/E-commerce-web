// Retrieve the cart from localStorage (or use a session variable if necessary)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display on the cart page
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear the existing list

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.product}" width="50">
                <span>${item.product} - ₹${item.price} x ${item.quantity}</span>
                <button onclick="removeFromCart('${item.product}')">Remove One</button>
            `;
            cartItemsList.appendChild(cartItemElement);
        });
    }
}

// Remove item from cart
function removeFromCart(productName) {
    const existingProduct = cart.find(item => item.product === productName);

    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
        } else {
            cart = cart.filter(item => item.product !== productName);
        }
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartTotal();
}

// Calculate total price
function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update total price
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: ₹${getTotalPrice().toFixed(2)}`;
}

// Add event listener for closing the cart sidebar
document.getElementById('close-cart').addEventListener('click', () => {
    window.location.href = 'index.html'; // Go back to the main page
});

// Initial display of the cart
updateCartDisplay();
updateCartTotal();
