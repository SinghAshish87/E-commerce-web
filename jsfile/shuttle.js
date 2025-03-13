// Initialize cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product to the cart
function addToCart(productName, image, price) {
    const existingProduct = cart.find(item => item.product === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already exists in cart
    } else {
        cart.push({ product: productName, image, price, quantity: 1 }); // Add new product to cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the cart display and cart count
    updateCartDisplay();
    updateCartCount();
}

// Function to update the cart display inside the sidebar
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear the existing cart display

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.product}">
                <span>${item.product} - ₹${item.price} x ${item.quantity}</span>
                <button onclick="removeFromCart('${item.product}')">Remove One</button>
                <button onclick="addToCart('${item.product}', '${item.image}', ${item.price})">Add</button> <!-- Add more button -->
            `;
            cartItemsList.appendChild(cartItemElement);
        });
    }
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = cart.length;
 
    document.getElementById('cart-btn').textContent = `Cart ${cartCount}`;
}

// Function to remove one unit of an item from the cart
function removeFromCart(index) {
    // const existingProduct = cart.find(item => item.product === productName);

    // if (existingProduct) {
    //     if (existingProduct.quantity > 1) {
    //         existingProduct.quantity -= 1; // Decrease quantity if more than 1
    //     } else {
    //         cart = cart.filter(item => item.product !== productName); // Remove the product if quantity is 1
    //     }
    // }
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));


    updateCartDisplay();
    updateCartCount();
}

// Function to calculate total price
function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to update total price in the cart sidebar
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: ₹${getTotalPrice().toFixed(2)}`;
}

// Function to toggle the visibility of the cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');  // Toggle the 'open' class to show/hide the cart
    updateCartTotal(); // Update total when cart is shown
}

// Add event listener for cart button
document.getElementById('cart-btn').addEventListener('click', toggleCart);

// Add event listener for close button in the cart sidebar
document.getElementById('close-cart').addEventListener('click', toggleCart);

// Add event listeners for "Add to Cart" buttons on each product
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const image = productElement.querySelector('img').src;
        const price = parseFloat(productElement.querySelector('.product-price').textContent.replace('₹', ''));

        addToCart(productName, image, price);
    });
});

updateCartCount();
updateCartDisplay()