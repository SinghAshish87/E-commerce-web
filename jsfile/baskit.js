// Initialize cart variables
let cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Array to store cart items
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
let lastScrollPosition = 0;

const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Notification container (used to display the notifications)
const notificationContainer = document.getElementById("notification-container");

// Toggle the visibility of the cart modal
cartIcon.addEventListener("click", function () {
  cartModal.classList.toggle("show");
  if (cartModal.classList.contains("show")) {
    lastScrollPosition = window.scrollY; // Remember current scroll position when opening the cart
  }
});

// Close Cart Modal
function closeCart() {
  cartModal.classList.remove("show");
  window.scrollTo(0, lastScrollPosition);
}

// Add to Cart
function addToCart(button) {
  const card = button.closest(".card");
  const productName = card.getAttribute("data-name"); // Get the product name dynamically
  const productPrice = parseFloat(card.getAttribute("data-price"));
  const productImage = card.getAttribute("data-img"); // Get the image URL dynamically

  // Check if the product already exists in the cart
  const existingItem = cartItems.find((item) => item.name === productName);

  if (existingItem) {
    showNotification("This product is already in your cart!"); // Message dikhao, dobara add mat karo
    return; // Function yahin stop kar do
  }

  // If the product doesn't exist, add it to the cart
  cartItems.push({
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: 1,
  });

  // Update the cart count

  localStorage.setItem("cart", JSON.stringify(cartItems));
  showNotification(`${productName} has been added to your cart!`);
  // Update the cart view
  updateCartCount();
  updateCart();
}
function updateCartCount() {
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Show Notification with Animation
function showNotification(productName) {
  const notification = document.createElement("div");
  let notificationContainer = document.getElementById("notification-container");

  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.top = "20px";
    notificationContainer.style.right = "20px";
    notificationContainer.style.zIndex = "1000";
    notificationContainer.style.width = "auto";
    document.body.appendChild(notificationContainer);
  }
  notification.classList.add("notification");

  // Create smiley face element
  const smiley = document.createElement("span");
  smiley.classList.add("smiley");
  smiley.textContent = "😊"; // Smiley face emoji

  // Create text for the notification
  const notificationText = document.createElement("span");
  notificationText.textContent = `${productName} added to cart`; // This dynamically shows the product name

  // Append smiley and text to the notification
  notification.appendChild(smiley);
  notification.appendChild(notificationText);

  // Append the notification to the container
  notificationContainer.appendChild(notification);

  // Remove notification after 4 seconds (to match animation time)
  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 4000); // Timeout is 4s to match the animation duration
}

// Update Cart Display
function updateCart() {
  cartItemsList.innerHTML = ""; // Clear the cart

  let totalPrice = 0;

  // Loop through cart items and create cart item list elements
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");

    // Create the cart item element with the image, name, price, quantity, etc.
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" width="50" />  <!-- Product Image -->
      <p>${item.name} x${item.quantity}</p>  <!-- Product Name and Quantity -->
      <p>Rs ${
        item.price * item.quantity
      }</p>  <!-- Total Price for that item -->
      <div class="adjust-quantity">
        <button onclick="increaseQuantity('${item.name}')">+</button>
        <button onclick="decreaseQuantity('${item.name}')">-</button>
      </div>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsList.appendChild(cartItem);
  });

  // Update the total price in the cart
  totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
}

// Increase Item Quantity
function increaseQuantity(name) {
  const item = cartItems.find((item) => item.name === name);
  if (item) {
    item.quantity += 1;
    cartCount += 1;
    updateCart();
  }
}

// Decrease Item Quantity
function decreaseQuantity(name) {
  const item = cartItems.find((item) => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    cartCount -= 1;
    updateCart();
  }
}

// Remove Item from Cart
function removeFromCart(name) {
  cartItems = cartItems.filter((item) => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  updateCart();
}

// Checkout (Placeholder for now)
function checkout() {
  alert("Proceeding to Checkout...");
}

updateCart();
updateCartCount();
