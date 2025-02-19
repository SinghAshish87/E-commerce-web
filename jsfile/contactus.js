let cart = [];  // Array to store cart items

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
    document.getElementById('cartCount').innerText = cart.length;

    // Update cart dropdown with product details
    updateCartDropdown();

    // Alert user that the product was added
    alert(`${productName} has been added to your cart!`);
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



// contact us  form

// Function to handle the form submission
function submitContactForm(event) {
    event.preventDefault();  // Prevents the default form submission behavior

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const countryCode = document.getElementById('countryCode').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;
    const phoneError = document.getElementById('phoneError');
    const errorMessage = document.getElementById('errorMessage');

    // Reset error messages
    phoneError.style.display = "none"; // Hide the phone error initially
    errorMessage.style.display = "none"; // Hide the general error initially

    // Basic form validation (can be expanded as needed)
    if (name === "" || email === "" || countryCode === "" || phone === "" || country === "" || message === "") {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.display = "inline"; // Show error message
        return; // Prevent form submission
    }

    // Define the phone number format (regex) for each country code
    const countryPhonePatterns = {
        '91': /^[6-9]\d{9}$/,    // India: 10 digits, starting with 6-9
        '1': /^\d{10}$/,          // US/Canada: 10 digits
        '44': /^\d{10}$/,         // UK: 10 digits
        '61': /^\d{9}$/,          // Australia: 9 digits
        '81': /^\d{10}$/,         // Japan: 10 digits
        '49': /^\d{10}$/,         // Germany: 10 digits
        '33': /^\d{10}$/          // France: 10 digits
    };

    // Check if the phone number matches the selected country's phone format
    if (!countryPhonePatterns[countryCode].test(phone)) {
        phoneError.style.display = "inline";  // Show phone error message
        phoneError.textContent = "Your phone number does not match the selected country code format.";
        return;  // Prevent form submission
    }

    // Combine the country code with the phone number
    const fullPhoneNumber = `+${countryCode} ${phone}`;

    // Example: Log the form data (optional: you can send this data to the server)
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Phone: " + fullPhoneNumber);
    console.log("Country: " + country);
    console.log("Message: " + message);

    // Here you could send the form data to a server, e.g., using fetch (or AJAX)
    /*
    fetch('/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: fullPhoneNumber,
            country: country,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
    })
    .catch(error => {
        alert('Error sending message.');
    });
    */

    // After submission, show success message or clear form if successful
    alert("Form submitted successfully!");

    // Reset the form fields after submission (clear the form after a successful submit)
    document.getElementById('contactForm').reset();
}

// Optional: Check phone number format while typing
document.getElementById('phone').addEventListener('input', function() {
    const countryCode = document.getElementById('countryCode').value;
    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');

    const countryPhonePatterns = {
        '91': /^[6-9]\d{9}$/,    // India: 10 digits, starting with 6-9
        '1': /^\d{10}$/,          // US/Canada: 10 digits
        '44': /^\d{10}$/,         // UK: 10 digits
        '61': /^\d{9}$/,          // Australia: 9 digits
        '81': /^\d{10}$/,         // Japan: 10 digits
        '49': /^\d{10}$/,         // Germany: 10 digits
        '33': /^\d{10}$/          // France: 10 digits
    };

    // Check if the phone number matches the selected country's phone format
    if (!countryPhonePatterns[countryCode].test(phone)) {
        phoneError.style.display = "inline";  // Show error message
        phoneError.textContent = "Your phone number does not match the selected country code format.";
    } else {
        phoneError.style.display = "none";  // Hide error message if the phone number is valid
    }
});
