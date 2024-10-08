document.addEventListener('DOMContentLoaded', function () {
    // Retrieve order details from local storage or your data source
    var orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

    // Display order items on the checkout page
    var orderItemsContainer = document.querySelector('.order-items');
    var totalAmountElement = document.getElementById('checkout-total');

    orderDetails.forEach(function (item) {
        var orderItem = document.createElement('div');
        orderItem.innerHTML = `
            <div>${item.title}</div>
            <div>Quantity: ${item.quantity}</div>
            <div>Price: ${item.price}</div>
            <hr>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    // Calculate and display the total amount
    var totalAmount = orderDetails.reduce(function (acc, item) {
        return acc + item.price * item.quantity;
    }, 0);

    totalAmountElement.textContent = '$' + totalAmount.toFixed(2);

    // Add event listener for the "Place Order" button
    var placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', function () {
        // Implement logic to process the order (e.g., send to server, update database)
        alert('Order placed successfully!');
        // Clear order details after placing the order
        localStorage.removeItem('orderDetails');
        // You can redirect to a confirmation page or perform other actions
        // window.location.href = 'confirmation.html';
    });
});
