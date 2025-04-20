document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".image-slider");

  sliders.forEach((slider) => {
    const images = slider.querySelectorAll("img");
    const dots = slider.querySelectorAll(".dot");
    let index = 0;

    const showImage = (i) => {
      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === i);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active-dot", idx === i);
      });
    };

    slider.querySelector(".prev").addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    slider.querySelector(".next").addEventListener("click", () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        index = parseInt(dot.getAttribute("data-index"));
        showImage(index);
      });
    });

    showImage(index);
  });
});

// Initialize cart variables
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
let lastScrollPosition = 0;

const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Notification container
const notificationContainer = document.getElementById("notification-container");

// Toggle cart modal
cartIcon.addEventListener("click", function () {
  cartModal.classList.toggle("show");
  if (cartModal.classList.contains("show")) {
    lastScrollPosition = window.scrollY;
  }
});

function closeCart() {
  cartModal.classList.remove("show");
  window.scrollTo(0, lastScrollPosition);
}

function addToCart(button) {
  const card = button.closest(".product-card");
  const productName = card.getAttribute("data-name");
  const productPrice = parseFloat(card.getAttribute("data-price"));
  const productImage = card.getAttribute("data-img");

  const existingItem = cartItems.find((item) => item.name === productName);

  if (existingItem) {
    showNotification("This product is already in your cart!");
    return;
  }

  cartItems.push({
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: 1,
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  showNotification(`${productName} has been added to your cart!`);
  updateCartCount();
  updateCart();
}

function updateCartCount() {
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

function showNotification(productName) {
  const notification = document.createElement("div");
  let notificationContainer = document.getElementById("notification-container");

  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    document.body.appendChild(notificationContainer);
  }

  notification.classList.add("notification");

  const smiley = document.createElement("span");
  smiley.classList.add("smiley");
  smiley.textContent = "😊";

  const notificationText = document.createElement("span");
  notificationText.textContent = `${productName} added to cart`;

  notification.appendChild(smiley);
  notification.appendChild(notificationText);
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 4000);
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50" />
      <p>${item.name} x${item.quantity}</p>
      <p>Rs ${item.price * item.quantity}</p>
      <div class="adjust-quantity">
        <button onclick="increaseQuantity('${item.name}')">+</button>
        <button onclick="decreaseQuantity('${item.name}')">-</button>
      </div>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsList.appendChild(cartItem);
  });

  totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
}

function increaseQuantity(name) {
  const item = cartItems.find((item) => item.name === name);
  if (item) {
    item.quantity += 1;
    cartCount += 1;
    updateCart();
  }
}

function decreaseQuantity(name) {
  const item = cartItems.find((item) => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    cartCount -= 1;
    updateCart();
  }
}

function removeFromCart(name) {
  cartItems = cartItems.filter((item) => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  updateCart();
}

function checkout() {
  alert("Proceeding to Checkout...");
}

updateCart();
updateCartCount();
