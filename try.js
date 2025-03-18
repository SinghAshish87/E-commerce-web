// Cart variables
let cartCount = 0; // Initialize cart count to 0
let cartItems = []; // Array to store cart items
let lastScrollPosition = 0; // Variable to store the last scroll position

const cartIcon = document.getElementById('cart-icon');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.querySelector('.cart-modal');
const cartItemsList = document.getElementById('cart-items');
const notification = document.querySelector('.notification');

// Dropdown Variables
const dropdownButton = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Toggle the visibility of the cart modal
cartIcon.addEventListener('click', function() {
  cartModal.classList.toggle('show');
  if (cartModal.classList.contains('show')) {
    // When opening the cart, remember the current scroll position
    lastScrollPosition = window.scrollY;
  }
});

// Function to add items to the cart
function addToCart(productButton) {
  const card = productButton.closest('.card');
  const productName = card.getAttribute('data-name');
  const productPrice = parseFloat(card.getAttribute('data-price'));

  // Check if the product already exists in the cart
  const existingItem = cartItems.find(item => item.name === productName);

  if (existingItem) {
    // If the product already exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If the product doesn't exist, add it to the cart
    cartItems.push({ name: productName, price: productPrice, quantity: 1 });
  }

  // Update cart count and cart display
  cartCount += 1;
  cartCountElement.textContent = cartCount;

  // Show notification
  showNotification(`${productName} has been added to your cart!`);

  // Update the cart view
  updateCart();
}

// Function to show the notification
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = 'block';

  // Hide notification after 3 seconds
  setTimeout(function() {
    notification.style.display = 'none';
  }, 3000);
}

// Function to update the cart view
function updateCart() {
  cartItemsList.innerHTML = ''; // Clear current items from the cart

  let totalPrice = 0;

  // Loop through the cartItems array and create an <li> for each item
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-item');

    // Add product name, quantity, price, and buttons
    li.innerHTML = `
      <span>${item.name} - Rs ${item.price.toFixed(2)} x ${item.quantity}</span>
      <button onclick="increaseQuantity('${item.name}')">+</button>
      <button onclick="decreaseQuantity('${item.name}')">-</button>
      <button onclick="removeItem('${item.name}')">Remove</button>
    `;
    
    // Append the item to the cart list
    cartItemsList.appendChild(li);

    // Add to total price
    totalPrice += item.price * item.quantity;
  });

  // Update the total price
  document.getElementById('total-price').textContent = `Rs ${totalPrice.toFixed(2)}`;
}

// Function to increase quantity of an item
function increaseQuantity(name) {
  const item = cartItems.find(item => item.name === name);
  if (item) {
    item.quantity += 1;
    cartCount += 1; // Increment the cart count
    cartCountElement.textContent = cartCount; // Update the display
    updateCart();
  }
}

// Function to decrease quantity of an item
function decreaseQuantity(name) {
  const item = cartItems.find(item => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    cartCount -= 1; // Decrement the cart count
    cartCountElement.textContent = cartCount; // Update the display
    updateCart();
  }
}

// Function to remove an item from the cart
function removeItem(name) {
  const itemIndex = cartItems.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cartCount -= cartItems[itemIndex].quantity;
    cartItems.splice(itemIndex, 1);
    cartCountElement.textContent = cartCount; // Update the display
    updateCart();
  }
}

// Checkout function (simple placeholder)
function checkout() {
  alert('Proceeding to Checkout...');
}

// Close Cart Modal and Return to Previous Scroll Position
function closeCart() {
  cartModal.classList.remove('show');
  window.scrollTo(0, lastScrollPosition); // Scroll back to the previous position
}

// Add the closeCart function to a "Close" button in the cart modal
document.querySelector('.close-btn').addEventListener('click', closeCart);

// Dropdown functionality
dropdownButton.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent closing dropdown if clicking inside
  dropdownContent.classList.toggle('show');
});

// Close the dropdown if you click outside of it
document.addEventListener('click', function(event) {
  if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
    dropdownContent.classList.remove('show');
  }
});
