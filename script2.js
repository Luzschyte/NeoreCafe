document.addEventListener("DOMContentLoaded", function() {
    let cartItems = [];
    let totalPrice = 0;

    const cartButtons = document.querySelectorAll(".add-to-cart");
    const orderItemsDiv = document.getElementById("orderItems");
    const orderTotalInput = document.getElementById("orderTotal");

    cartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));

            addItemToCart(itemName, itemPrice);
        });
    });

    function addItemToCart(itemName, itemPrice) {
        const item = { name: itemName, price: itemPrice, id: new Date().getTime() };
        cartItems.push(item);
        totalPrice += itemPrice;
        updateCartDisplay();
    }

    function removeItemFromCart(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            totalPrice -= cartItems[itemIndex].price;
            cartItems.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        orderItemsDiv.innerHTML = "";
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "order-item";
            itemDiv.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Remove</button>
            `;
            orderItemsDiv.appendChild(itemDiv);
        });
        orderTotalInput.value = `$${totalPrice.toFixed(2)}`;

        // Attach remove button events
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeItemFromCart(itemId);
            });
        });
    }
});