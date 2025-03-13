let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Array to store cart items

const fetch = () => {
    document.getElementById('cartCount').innerText = cart.length;
}
fetch();
// Function to add product to cart
function addToCart(productName, productPrice, productImage) {
    // Create product object
    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    // Add product to cart array
    cart.push(product);
    // Update cart count
    fetch();

    // Update cart dropdown with product details
    updateCartDropdown();

    // Alert user that the product was added
    alert(`${productName} has been added to your cart!`);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update cart dropdown
function updateCartDropdown() {
    const cartDropdownMenu = document.getElementById('cartDropdownMenu');
    cartDropdownMenu.innerHTML = '';  // Clear previous cart items

    let totalAmount = 0;

    // Loop through the cart and display products in the dropdown
    cart.forEach((product, index) => {
        // Create list item for each product
        const li = document.createElement('li');
        li.classList.add('cart-item');

        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="30" height="30" style="border-radius: 5px;">
            ${product.name} - ₹${product.price}
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartDropdownMenu.appendChild(li);

        // Calculate total amount
        totalAmount += product.price;
    });

    // Display total amount at the bottom of the dropdown
    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong>Total: ₹${totalAmount}</strong>`;
    cartDropdownMenu.appendChild(totalLi);
}

// Function to handle the "Add to Cart" button click
function onAddToCartClick(productName, productPrice, productImage) {
    addToCart(productName, productPrice, productImage);
}

// Function to remove product from cart
function removeFromCart(index) {
    // Remove the product from the cart array
    cart.splice(index, 1);
    // Update cart count
    document.getElementById('cartCount').innerText = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
     fetch();
    // Update the cart dropdown
    updateCartDropdown();
}

// Example: Add event listener for "Add to Cart" buttons in product cards
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = parseInt(productCard.querySelector('.product-price').innerText.replace('₹', '').trim());
        const productImage = productCard.querySelector('img').src;

        onAddToCartClick(productName, productPrice, productImage);
    });
});
