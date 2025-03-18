document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get elements to display cart items and total price
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // If the cart is empty, show a message
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty!</p>';
        cartTotal.textContent = 'Total: Rs0.00';
    } else {
        let totalPrice = 0;
        
        // Loop through cart items and create HTML for each product
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50" />
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsList.appendChild(itemElement);
            
            // Add the price to the total (assuming price format: "Rs 1800")
            totalPrice += parseFloat(item.price.replace('Rs', '').trim());
        });

        // Update the total price
        cartTotal.textContent = `Total: Rs${totalPrice.toFixed(2)}`;
    }

    // Remove item from cart
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');

            // Remove the item from the cart array
            cart = cart.filter(item => item.name !== itemName);

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Refresh the page to update the cart display
            location.reload();
        });
    });

    // Optional: Clear cart functionality (Clear all items)
    document.getElementById('clear-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        location.reload(); // Refresh to show the cart is now empty
    });
});
