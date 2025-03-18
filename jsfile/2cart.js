// JavaScript for adding products to the cart and showing notification
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cartCount');
const cartDropdownMenu = document.getElementById('cartDropdownMenu');
const cartNotification = document.getElementById('cart-notification');

// Load the cart from localStorage (if any)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count in the navbar
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Add a product to the cart
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Example of adding a product, here we use product index as ID
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    const product = {
      name: productName,
      price: productPrice,
      quantity: 1
    };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex === -1) {
      cart.push(product);
    } else {
      // Update the quantity if product already exists in the cart
      cart[existingProductIndex].quantity += 1;
    }

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show notification
    cartNotification.textContent = `${product.name} added to cart!`;
    cartNotification.style.display = 'block';

    // Hide notification after 2 seconds
    setTimeout(() => {
      cartNotification.style.display = 'none';
    }, 2000);

    // Update the cart count
    updateCartCount();
  });
});

// Show cart items in dropdown
function showCartItems() {
  cartDropdownMenu.innerHTML = ''; // Clear current cart items in dropdown
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} x ${item.quantity}`;
    cartDropdownMenu.appendChild(listItem);
  });
}

// Update cart items on page load
window.addEventListener('load', () => {
  updateCartCount();
  showCartItems();
});
