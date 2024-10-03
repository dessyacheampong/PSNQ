// ############### TABLE OF CONTENT ##############

// ############### CART ###############
// 1.0 Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// 1.1 Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// 1.2 Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// 1.3 Cart Working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// 1.4 Making Function
function ready() {
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Work 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}


// remove Items from Cart 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes 
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    // Fix the loop condition
    for (var i = 0; i < cartItemsNames.length; i++) {
        var cartItemTitle = cartItemsNames[i].innerText;

        // Check if the item is already in the cart
        if (cartItemTitle === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price"> ${price} </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    // Add event listeners after adding to cart
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    // Update Total
    updateTotal();
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // for decimal values 
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}


//Buy Button 
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var orderDetails = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;

        // Create an object for each item in the order
        var orderItem = {
            title: title,
            price: parseFloat(price.replace('$', '')),
            quantity: parseInt(quantity)
        };

        orderDetails.push(orderItem);
    }

    // Store order details in local storage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to the checkout page
    window.location.href = 'checkout.html';
}


// ############### COUNTDOWN ###########

document.addEventListener('DOMContentLoaded', function () {
    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + 1000 * 60 * 60 * 280; // Example: 2 hours from now

    // Update the countdown every 1 second
    var x = setInterval(function () {
        // Get the current date and time
        var now = new Date().getTime();

        // Calculate the remaining time
        var distance = countDownDate - now;

        // Calculate hours, minutes, and seconds
        var hours = Math.floor(distance / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format time with leading zeros and separate with colons
        var formattedTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

        // Display the formatted countdown
        document.getElementById('countdown').innerText = formattedTime;

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('countdown').innerText = '00:00:00';
        }
    }, 1000);

    // Function to format time with leading zeros
    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }
});


// ############### POP-UP ###############

document.addEventListener('DOMContentLoaded', function () {
    // Check if the popup has been shown before
    var popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
        // Show the initial popup when the page loads
        showPopup();

        // Set the flag in localStorage to indicate that the popup has been shown
        localStorage.setItem('popupShown', 'true');
    }
});

function showPopup() {
    var popupContainer = document.getElementById('popup-container');
    popupContainer.classList.add('show');

    // Attach an event listener to the "Close" button
    var closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', function () {
        // Close the current popup after 2 seconds
        setTimeout(function () {
            popupContainer.classList.remove('show');
            // Show another popup after 2 seconds
            setTimeout(function () {
                showSecondPopup();
            }, 2000);
        }, 2000);
    });
}

function showSecondPopup() {
    var secondPopupContainer = document.getElementById('second-popup-container');
    secondPopupContainer.classList.add('show');

    // You may want to attach an event listener to the "Close" button in the second popup
    var secondCloseButton = document.getElementById('second-close-button');
    secondCloseButton.addEventListener('click', function () {
        // Close the second popup after 2 seconds
        setTimeout(function () {
            secondPopupContainer.classList.remove('show');
        }, 2000);
    });
}
