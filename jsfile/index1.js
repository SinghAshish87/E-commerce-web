// ==================== Cart Variables ====================
let cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Array to store cart items
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Initialize cart count based on quantity
let lastScrollPosition = 0; // Variable to store the last scroll position

// ==================== DOM Elements ====================
const cartIcon = document.getElementById("cart-icon");
const cartCountElement = document.getElementById("cart-count");
const cartModal = document.querySelector(".cart-modal");
const cartItemsList = document.getElementById("cart-items");
const notification = document.querySelector(".notification");
const totalPriceElement = document.getElementById("total-price");
const closeBtn = document.querySelector(".close-btn");
const dropdownButton = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

// ==================== Event Listeners ====================
cartIcon.addEventListener("click", toggleCartModal);
if (closeBtn) closeBtn.addEventListener("click", closeCart);
dropdownButton.addEventListener("click", toggleDropdown);
document.addEventListener("click", closeDropdown);

// ==================== Cart Functions ====================
function toggleCartModal() {
  cartModal.classList.toggle("show");
  if (cartModal.classList.contains("show")) {
    lastScrollPosition = window.scrollY;
  }
  updateCart();
}

function updateCartCount() {
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = cartCount;
}

function addToCart(buttonNumber) {
  // const productName = `Product ${buttonNumber}`;
  let productCard = buttonNumber.closest(".product-info");
  let productName = productCard.querySelector("h2:nth-child(1)").innerText;
  const productPrice = (Math.random() * 100).toFixed(2);

  let existingItem = cartItems.find((item) => item.name === productName);

  if (existingItem) {
    showNotification("This product is already in your cart!"); // Message dikhao, dobara add mat karo
    return; // Function yahin stop kar do
  }
  cartItems.push({
    name: productName,
    price: productPrice,
    quantity: 1,
  });

  updateCartCount();
  updateCart();
  localStorage.setItem("cart", JSON.stringify(cartItems));
  showNotification(`${productName} has been added to your cart!`);
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <span>${item.name} - Rs ${item.price} x ${item.quantity}</span>
      <button onclick="changeQuantity('${item.name}', 1)">+</button>
      <button onclick="changeQuantity('${item.name}', -1)">-</button>
      <button onclick="removeItem('${item.name}')">Remove</button>
    `;
    cartItemsList.appendChild(li);
    totalPrice += item.price * item.quantity;
  });
  totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
}

function changeQuantity(name, change) {
  const item = cartItems.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItem(name);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

function removeItem(name) {
  cartItems;
  cartItems = cartItems.filter((item) => item.name !== name);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  updateCart();
}

function checkout() {
  alert("Proceeding to Checkout...");
}

function closeCart() {
  cartModal.classList.remove("show");
  window.scrollTo(0, lastScrollPosition);
}

// ==================== UI Functions ====================
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 3000);
}

function toggleDropdown(event) {
  event.stopPropagation();
  dropdownContent.classList.toggle("show");
}

function closeDropdown(event) {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownContent.contains(event.target)
  ) {
    dropdownContent.classList.remove("show");
  }
}

// ==================== Initialize Cart Count ====================
updateCartCount();
