// Event listener for the "Place Order" button (Pay Now)
document.getElementById("place-order").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Simulate payment processing delay (You can replace this with real payment logic)
    setTimeout(function() {
        // Hide the form and show the success message
        document.getElementById("checkout-form").style.display = "none"; // Hide the form
        document.getElementById("success-message").classList.remove("hidden"); // Show the success message
    }, 2000); // Simulating a 2-second payment processing delay
});

// Event listener for the "OK" button to redirect to another page
document.getElementById("ok-button").addEventListener("click", function() {
    window.location.href = "try.html"; // Redirect to a thank you page or another page
});
